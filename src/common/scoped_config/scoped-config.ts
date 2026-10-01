/**
 * Configuraciones editables con anulación por categoría etaria: la fila con
 * id_category = NULL es la configuración global y cada categoría puede tener
 * su propia fila que la reemplaza por completo.
 */
export type ConfigScope = 'category' | 'global'

export interface ScopedConfig<T> {
  config: T
  scope: ConfigScope
}

/**
 * Devuelve la configuración de la categoría si existe y, si no, la global,
 * indicando de dónde salió. La global solo se carga cuando hace falta.
 */
export async function resolveScopedConfig<T>(
  categoryConfig: T | null | undefined,
  loadGlobal: () => Promise<T>,
): Promise<ScopedConfig<T>> {
  if (categoryConfig) return { config: categoryConfig, scope: 'category' }
  return { config: await loadGlobal(), scope: 'global' }
}

/**
 * Caché de configuraciones por categoría para una sola ejecución de un cron:
 * cada categoría (y la global) se consulta una vez, no una vez por deportista.
 * Se debe crear una instancia nueva en cada ejecución para tomar los cambios
 * que el club haga entre corridas.
 */
export class ScopedConfigCache<T> {
  private readonly cache = new Map<string, Promise<ScopedConfig<T>>>()

  constructor(
    private readonly loader: (
      id_category: number | null,
    ) => Promise<ScopedConfig<T>>,
  ) {}

  get(id_category?: number | null): Promise<ScopedConfig<T>> {
    const key = id_category ? String(id_category) : 'global'
    let pending = this.cache.get(key)
    if (!pending) {
      pending = this.loader(id_category ?? null)
      this.cache.set(key, pending)
      // Si la consulta falla no se deja cacheado el error
      pending.catch(() => this.cache.delete(key))
    }
    return pending
  }
}

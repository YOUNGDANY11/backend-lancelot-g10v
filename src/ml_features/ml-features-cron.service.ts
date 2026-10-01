import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { todayKey } from 'src/common/utils/date.util'
import { extractErrorMessage } from 'src/common/utils/error-message.util'
import { MlFeaturesService } from './ml-features.service'

/**
 * Flujo diario de las 5 AM, después de los crons de fatiga (3 AM) y de riesgo
 * por reglas (4 AM), para que el snapshot incluya el nivel de riesgo del día:
 * 1. Snapshot de variables de todos los deportistas para hoy.
 * 2. Etiquetado retroactivo de los días que ya cumplieron 7 días.
 */
@Injectable()
export class MlFeaturesCronService {
  private readonly logger = new Logger(MlFeaturesCronService.name)

  constructor(private readonly mlFeaturesService: MlFeaturesService) {}

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async runDailyFeaturePipeline() {
    const today = todayKey()

    try {
      const snapshot = await this.mlFeaturesService.buildSnapshots(today, today)
      this.logger.log(
        `Snapshot de variables del ${today}: ${snapshot.snapshots} deportistas, ${snapshot.failed.length} con error`,
      )
    } catch (error) {
      this.logger.error(
        `Error al generar el snapshot diario de variables: ${extractErrorMessage(error)}`,
      )
    }

    try {
      const labels = await this.mlFeaturesService.labelRows({
        onlyUnlabeled: true,
      })
      this.logger.log(
        `Etiquetado retroactivo: ${labels.processed} snapshots (${labels.labeled_positive} positivos, ${labels.unknown_mechanism} con mecanismo desconocido)`,
      )
    } catch (error) {
      this.logger.error(
        `Error en el etiquetado retroactivo: ${extractErrorMessage(error)}`,
      )
    }
  }
}

import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.URL_DB,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
})

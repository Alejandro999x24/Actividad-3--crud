// Módulo de base de datos que configura las conexiones a PostgreSQL y MySQL utilizando TypeORM.
// Se utiliza ConfigModule para cargar las variables de entorno desde el archivo de configuración y se exporta TypeOrmModule
// para que pueda ser utilizado en otros módulos de la aplicación.

import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import config from '../config';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(config),

    TypeOrmModule.forRootAsync({
      name: 'postgresConnection',
      inject: [config.KEY],
      useFactory: (configType: ConfigType<typeof config>) => {
        const { postgres } = configType.database;

        return {
          name: 'postgresConnection',
          type: 'postgres',
          host: postgres.host,
          port: postgres.port,
          username: postgres.user,
          password: postgres.password,
          database: postgres.name,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),

    TypeOrmModule.forRootAsync({
      name: 'mysqlConnection',
      inject: [config.KEY],
      useFactory: (configType: ConfigType<typeof config>) => {
        const { mysql } = configType.database;

        return {
          name: 'mysqlConnection',
          type: 'mysql',
          host: mysql.host,
          port: mysql.port,
          username: mysql.user,
          password: mysql.password,
          database: mysql.name,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

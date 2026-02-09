import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import config from '../config';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(config),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configType: ConfigType<typeof config>) => {
        const { user, host, name, password, port } = configType.database;

        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: name,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
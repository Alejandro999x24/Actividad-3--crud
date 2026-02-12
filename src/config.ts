//llamado a las vaariables de entorno para la conexión a la base de datos, tanto para postgres como mysql, se pueden agregar más variables si es necesario

import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    postgres: {
      name: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
    },
    mysql: {
      name: process.env.MYSQL_DB,
      port: parseInt(process.env.MYSQL_PORT || '3307', 10),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_HOST,
    },
  },
}));

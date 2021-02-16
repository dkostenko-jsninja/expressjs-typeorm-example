import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const mysqlConfig: MysqlConnectionOptions = {
  type: "mysql",
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT),
  synchronize: false,
  entities: ["src/models/**/*.entity.ts"],
  migrations: ["src/database/migrations/*.ts"],
  migrationsTableName: "migrations",
  migrationsRun: true,
  cli: {
    migrationsDir: "src/database/migrations",
  },
  extra: {
    socketPath: process.env.DATABASE_SOCKET_PATH,
  },
};

export default mysqlConfig;

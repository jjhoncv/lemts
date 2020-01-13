module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'db',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || '12345678',
  database: process.env.MYSQL_DATABASE || 'lemts',
  charset: 'utf8',
  driver: 'mysql',
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [
    '**/**.entity.ts'
    // '**/**.entity.js'
  ],
  logging: process.env.NODE_ENV !== 'production' ? 'all' : 'error',
  migrations: ["migration/*.ts"],
  cli: {
    migrationsDir: "migration"
  },
  connectTimeout: 30000,
  acquireTimeout: 30000
};

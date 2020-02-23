export const database = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'db',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || '12345678',
  database: process.env.MYSQL_DATABASE || 'lemts',
  charset: 'utf8',
  driver: 'mysql'
};

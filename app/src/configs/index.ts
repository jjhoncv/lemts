export const getDatabaseConfig = () => ({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT)
});
export const getServerConfig = () => ({
  port: 8080
});

export const jwtSecret = "@QEGTUI";
export const jwtExpires = "2h";

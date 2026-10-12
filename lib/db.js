import mysql from "mysql2/promise";

const DB_TIMEOUT_MS = Number(process.env.DB_TIMEOUT_MS || 2000);

export async function getDbConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "oosd_webappdev",
    connectTimeout: DB_TIMEOUT_MS,
    multipleStatements: false,
  });
}

export async function queryWithTimeout(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Database request timed out."));
    }, DB_TIMEOUT_MS);

    db.execute(sql, params)
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

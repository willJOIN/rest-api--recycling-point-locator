import mysql from "mysql2";

const pool = mysql.createPool({
    host: "localhost:3310",
    user: "root",
    password: "",
    database: "pontos_coleta",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool;
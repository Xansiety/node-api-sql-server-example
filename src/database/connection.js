import sql from 'mssql';
import config from '../config.js';

const dbSettings = {
    user: config.database.userDB,
    password: config.database.passwordDB,
    server: config.database.serverDB,
    database: config.database.databaseDB,
    options: config.database.optionsDB,
}

export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export { sql }
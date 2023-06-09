import { config } from 'dotenv';
config();

export default {
    port: process.env.PORT || 4001,
    database: {
        userDB: process.env.USER_DB,
        passwordDB: process.env.PASSWORD_DB,
        serverDB: process.env.SERVER_DB,
        databaseDB: process.env.DATABASE_DB,
        optionsDB: {
            encrypt: true, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    }
}
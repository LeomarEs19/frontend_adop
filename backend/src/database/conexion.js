import { createPool } from "mysql2/promise";
import dotenv from 'dotenv'

dotenv.config({ path: '.env'})

export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
});
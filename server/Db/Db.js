import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../../config/config';
import EncryptData from '../helpers/Encrypt';

dotenv.config();

const dbConfig = {
	connectionString: config.db,
};

class DatabaseInit {
	constructor() {
		try {
			this.pool = new Pool(dbConfig);
			this.connect = async () => this.pool.on('connect', () => {
			});

			this.queryUsers = `CREATE TABLE IF NOT EXISTS users(
                id serial PRIMARY KEY,
                firstname VARCHAR(128) NOT NULL,
                lastname VARCHAR(128) NOT NULL,
                email VARCHAR(128) NOT NULL,
                password VARCHAR(128) NOT NULL,
                isAdmin VARCHAR(100)  NOT NULL
				)`;
			this.initDb();
			this.createAdmin();
		} catch (error) {
			return error.toString();
		}
	}

	async query(sql, data = []) {
		const conn = await this.connect();
		try {
			if (data.length) {
				return await conn.query(sql, data);
			}
			return await conn.query(sql);
		} catch (err) {
			return err.toString();
		}
	}

	async initDb() {
		try {
			await this.query(this.queryUsers);
		} catch (error) {
			return error.toString();
		}
	}

	async createAdmin() {
		try {
			const sql = `SELECT * FROM users WHERE email='${process.env.EMAIL}'`;
			const {
				rows,
			} = await this.query(sql);
			if (rows.length === 0) {
				const hashedPassword = EncryptData.generateHash(process.env.PASSWORD);
				const adminUser = {
					firstname: 'admin',
					lastname: 'admin',
					email: process.env.EMAIL,
					password: hashedPassword,
					isAdmin: true,
				};
				const sqlAdmin = 'INSERT INTO users (firstname, lastname, email, password, isAdmin ) values($1, $2, $3, $4, $5) returning *';
				// eslint-disable-next-line max-len
				const value = [adminUser.firstname, adminUser.lastname, adminUser.email, adminUser.password, adminUser.isAdmin];
				// eslint-disable-next-line no-unused-vars
				const dataEntry = await this.query(sqlAdmin, value);
			}
		} catch (error) {
			return error.toString();
		}
	}
}

export default new DatabaseInit();

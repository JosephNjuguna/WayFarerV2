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
		this.queryTrips = `CREATE TABLE IF NOT EXISTS trips(
					id serial PRIMARY KEY,
					buslicensenumber VARCHAR(128) NOT NULL,
					seatingcapacity INTEGER NOT NULL,
					origin VARCHAR(128) NOT NULL,
					destination VARCHAR(128) NOT NULL,
					tripdate VARCHAR(128) NOT NULL,
					fare INTEGER NOT NULL,
					status VARCHAR(100) NOT NULL
					)`;
		this.queryBookings = `CREATE TABLE IF NOT EXISTS bookings(
						id serial PRIMARY KEY,
						tripid INTEGER NOT NULL,
						userid INTEGER NOT NULL,
						buslicensenumber VARCHAR(128) NOT NULL,
						tripdate VARCHAR(128) NOT NULL,
						firstname VARCHAR(128) NOT NULL,
						lastname VARCHAR(128) NOT NULL,
						email VARCHAR(100) NOT NULL,
						seatnumber INTEGER NOT NULL
						)`;
		this.initDb();
		this.createAdmin();
	}

	async query(sql, data = []) {
		const conn = await this.connect();
		if (data.length) {
			const sqldataquery = await conn.query(sql, data);
			return sqldataquery;
		}
		const dataquery = await conn.query(sql);
		return dataquery;
	}

	async initDb() {
		await this.query(this.queryUsers);
		await this.query(this.queryTrips);
		await this.query(this.queryBookings);
	}

	async createAdmin() {
		const sql = `SELECT * FROM users WHERE email='${process.env.EMAIL}'`;
		const { rows } = await this.query(sql);
		if (rows.length === 0) {
			const hashedPassword = EncryptData.generateHash(process.env.PASSWORD);
			const adminUser = {
				firstname: 'admin',
				lastname: 'admin',
				email: process.env.EMAIL,
				password: hashedPassword,
				isAdmin: true,
			};
			const sqlAdmin = 'INSERT INTO users (firstname, lastname, email, password, isAdmin ) VALUES($1, $2, $3, $4, $5) returning *;';
			// eslint-disable-next-line max-len
			const value = [adminUser.firstname, adminUser.lastname, adminUser.email, adminUser.password, adminUser.isAdmin];
			// eslint-disable-next-line no-unused-vars
			const dataEntry = await this.query(sqlAdmin, value);
		}
	}
}

export default new DatabaseInit();

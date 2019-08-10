/* eslint-disable max-len */
import Db from '../Db/Db';

class UsersModel {
	constructor(payload = null) {
		this.payload = payload;
		this.result = null;
	}

	static async findByEmail(email) {
		const sql = `SELECT * FROM users WHERE email='${email}'`;
		const { rows } = await Db.query(sql);
		if (rows.length === 0) {
			return false;
		}
		return true;
	}

	async signup() {
		const values = [this.payload.firstname, this.payload.lastname, this.payload.email, this.payload.hashedPassword, false];
		const sql = 'INSERT INTO users ( firstname, lastname, email, password, isAdmin) VALUES($1, $2, $3, $4, $5) returning *';
		const { rows } = await Db.query(sql, values);
		// eslint-disable-next-line prefer-destructuring
		this.result = rows[0];
		return true;
	}

	static async login(email) {
		const sql = `SELECT * FROM users WHERE email='${email}'`;
		const {
			rows,
		} = await Db.query(sql);
		if (rows.length === 0) {
			return false;
		}
		const result = rows[0];
		return result;
	}
}

export default UsersModel;

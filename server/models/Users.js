import db from '../MockData/users';

class UsersModel {
	constructor(payload = null) {
		this.payload = payload;
		this.result = null;
	}

	static async findByEmail(email) {
		const obj = db.find(o => o.email === email);
		if (!obj) {
			return false;
		}
		this.result = obj;
		return true;
	}

	async signup() {
		const userid = db.length + 1;
		const user = {
			id: userid,
			firstname: this.payload.firstname,
			lastname: this.payload.lastname,
			email: this.payload.email,
			password: this.payload.hashedPassword,
			isAdmin: false,
		};
		const obj = db.find(o => o.email === this.payload.email);
		if (!obj) {
			db.push(user);
			this.result = user;
			return true;
		}
	}

	static async login(email) {
		const obj = db.find(o => o.email === email);
		if (!obj) {
			return false;
		}
		this.result = obj;
		return this.result;
	}
}

export default UsersModel;

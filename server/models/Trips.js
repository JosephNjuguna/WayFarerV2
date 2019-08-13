/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable radix */
import db from '../Db/trips';
import Db from '../Db/Db';

class Trips {
	constructor(payload = null) {
		this.payload = payload;
		this.result = null;
	}

	static async findTrip(buslicensenumber, tripdate) {
		const sql = `SELECT * FROM trips WHERE buslicensenumber ='${buslicensenumber}' AND  tripdate = '${tripdate}'`;
		const { rows } = await Db.query(sql);
		if (rows.length === 0) {
			return false;
		}
		return true;
	}

	async createTrip() {
		const values = [this.payload.busLicensenumber, parseInt(this.payload.seatingCapacity), this.payload.origin, this.payload.destination, this.payload.tripDate, parseInt(this.payload.fare), 'active'];
		const sql = 'INSERT INTO trips (buslicensenumber, seatingcapacity, origin, destination, tripdate, fare, status ) VALUES($1, $2, $3, $4, $5, $6, $7) returning *';
		const { rows } = await Db.query(sql, values);
		// eslint-disable-next-line prefer-destructuring
		this.result = rows[0];
		return true;
	}

	async cancelTrip() {
		const tripId = parseInt(this.payload.tripId);
		const findtrip = `SELECT *  FROM trips WHERE id = '${tripId}'`;
		const { rows } = await Db.query(findtrip);
		if (rows.length === 0) {
			this.result = { status: 404, message: `Trip not found` };
			return false;
		}
		if (rows[0].status === 'canceled') {
			this.result = { status: 400, message: `This trip is already canceled` };
			return false;
		} else {
			const sql = `UPDATE trips SET status ='${this.payload.tripStatus}'  WHERE id = '${tripId}' returning *;`;
			const { rows } = await Db.query(sql);
			if (rows.length === 0) {
				this.result = { status: 404, message: `Trip not found` };
				return false;
			}
			// eslint-disable-next-line prefer-destructuring
			this.result = rows[0];
			return this.result;
		}
	}

	async viewAlltrips() {
		if (db.length === 0) {
			return false;
		}
		this.result = db;
		return this.result;
	}

	async viewActivetrips() {
		// eslint-disable-next-line radix
		const obj = db.find(o => o.status === 'active');
		if (!obj) {
			return false;
		}
		this.result = obj;
		return this.result;
	}

	async viewSingletrip() {
		// eslint-disable-next-line radix
		const id = parseInt(this.payload);
		const obj = db.find(o => o.id === id);
		if (!obj) {
			return false;
		}
		this.result = obj;
		return this.result;
	}

	async viewSingleActivetrip() {
		// eslint-disable-next-line radix
		const id = parseInt(this.payload);
		const obj = db.find(o => o.id === id && o.status === 'active');
		if (!obj) {
			return false;
		}
		this.result = obj;
		return this.result;
	}

	async filterOrigin() {
		const obj = db.filter(o => o.origin === this.payload.trip);
		if (obj.length === 0) {
			this.result = 'No Origin found.';
			return false;
		}
		this.result = obj;
		return true;
	}

	async filterDestination() {
		const obj = db.filter(o => o.destination === this.payload.trip);
		if (obj.length === 0) {
			this.result = 'No Destination found.';
			return false;
		}
		this.result = obj;
		return true;
	}
}

export default Trips;

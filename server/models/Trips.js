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
		const id = parseInt(this.payload.tripId);
		const obj = db.find(o => o.id === id);
		if (!obj) {
			this.result = { status: 404, message: `Trip id record '${id}' not found` };
			return false;
		}
		if (obj.status === 'canceled') {
			this.result = { status: 400, message: 'This trip is already canceled' };
			return false;
		}
		const tripCancel = {
			id: obj.id,
			seatingCapacity: obj.seatingCapacity,
			busLicensenumber: obj.busLicensenumber,
			origin: obj.origin,
			destination: obj.destination,
			tripDate: obj.tripDate,
			fare: obj.fare,
			status: this.payload.tripStatus || obj.status,
		};
		db.splice(obj.id - 1, 1, tripCancel);
		this.result = tripCancel;
		return true;
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

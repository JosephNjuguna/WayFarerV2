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
		const values = [this.payload.busLicensenumber, parseInt(this.payload.seatingCapacity, 10), this.payload.origin.toLowerCase(), this.payload.destination.toLowerCase(), this.payload.tripDate, parseInt(this.payload.fare, 10), 'active'];
		const sql = 'INSERT INTO trips (buslicensenumber, seatingcapacity, origin, destination, tripdate, fare, status ) VALUES($1, $2, $3, $4, $5, $6, $7) returning *';
		const { rows } = await Db.query(sql, values);
		this.result = rows[0];
		return true;
	}

	async cancelTrip() {
		const tripId = parseInt(this.payload.tripId, 10);
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
			const status = 'canceled';
			const sql = `UPDATE trips SET status ='${status}'  WHERE id = '${tripId}' returning *;`;
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
		const sql = 'SELECT * FROM trips';
		const { rows } = await Db.query(sql);
		if (rows.length === 0) {
			return false;
		}
		this.result = rows;
		return this.result;
	}

	async viewActivetrips() {
		const status = 'active';
		const sql = `SELECT * FROM trips WHERE status = '${status}'`;
		const { rows } = await Db.query(sql);
		if (rows.length === 0) {
			return false;
		}
		this.result = rows;
		return this.result;
	}

	async viewSingletrip() {
		const id = parseInt(this.payload, 10);
		const sql = `SELECT * FROM trips WHERE id ='${id}'`;
		const { rows } = await Db.query(sql);
		if (rows.length === 0) {
			return false;
		}
		this.result = rows[0];
		return this.result;
	}

	async viewSingleActivetrip() {
		const id = parseInt(this.payload, 10);
		const status = 'active';
		const sql = `SELECT * FROM trips WHERE id ='${id}' AND status = '${status}'`;
		const { rows } = await Db.query(sql);
		if (rows.length === 0) {
			return false;
		}
		this.result = rows[0];
		return this.result;
	}

	async filterOrigin() {
		const status = 'active';
		const sql = `SELECT * FROM trips WHERE origin = '${this.payload.trip.toLowerCase()}' AND status = '${status}'`;
		const { rows } = await Db.query(sql);
		if (rows.length === 0) {
			this.result = 'No Origin found.';
			return false;
		}
		this.result = rows;
		return this.result;
	}

	async filterDestination() {
		const status = 'active';
		const sql = `SELECT * FROM trips WHERE destination = '${this.payload.trip.toLowerCase()}' AND status = '${status}'`;
		const { rows } = await Db.query(sql);
		if (rows.length === 0) {
			this.result = 'No Destination found.';
			return false;
		}
		this.result = rows;
		return this.result;
	}
}

export default Trips;

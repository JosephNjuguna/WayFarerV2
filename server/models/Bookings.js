import db from '../Db/bookings';
import date from '../helpers/Date';
import Db from '../Db/Db';

class Bookings {
	constructor(payload = null) {
		this.payload = payload;
		this.result = null;
	}

	async bookaSeat() {
		const tripInfo = parseInt(this.payload.tripId, 10);
		const seatNo = parseInt(this.payload.seatNumber, 10);
		const obj = `SELECT *  FROM trips WHERE id = '${tripInfo}'`;
		const { rows } = await Db.query(obj);
		if (rows.length === 0) {
			this.result = { status: 404, message: `Trip Id : ${tripInfo} is not available` };
			return false;
		}
		if (rows[0].status === 'canceled') {
			this.result = { status: 400, message: `Cancelled. Trip Id : ${tripInfo} is cancelled and not available.` };
			return false;
		}
		const trip = [];
		trip.push(rows[0]);
		if (seatNo > rows[0].seatingcapacity || seatNo <= 0) {
			this.result = { status: 400, message: `Please select seat number less than ${rows[0].seatingcapacity} and not 0` };
			return false;
		}
		if (new Date(rows[0].tripdate) < new Date(date.modernDate())) {
			this.result = { status: 400, message: `Please select a current trip. this trip already happened on date ${rows[0].tripdate}.` };
			return false;
		} else {
			const sql = `SELECT *  FROM bookings WHERE tripId ='${tripInfo}' AND seatNumber = '${seatNo}'`;
			const { rows } = await Db.query(sql);
			if (rows.length > 0) {
				this.result = { status: 404, message: `Seat number : '${seatNo}' already taken. choose another seat` };
				return false;
			} else {
				const values = [tripInfo, this.payload.id, trip[0].buslicensenumber, trip[0].tripdate, this.payload.firstname, this.payload.lastname, this.payload.email, seatNo];
				const sql2 = 'INSERT INTO bookings (tripid, userid, buslicensenumber, tripdate, firstname, lastname, email, seatnumber ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *';
				const { rows } = await Db.query(sql2, values);
				this.result = rows;
				return true;
			}
		}
	}

	async userAllBooking() {
		const obj = await db.filter(o => o.email === this.payload.email);
		if (obj.length === 0) {
			this.result = 'Sorry you have no booking record yet.';
			return false;
		}
		this.result = obj;
		return true;
	}

	static async viewAllBooking() {
		if (db.length === 0) {
			return false;
		}
		this.result = db;
		return this.result;
	}

	async deleteBooking() {
		const id = parseInt(this.payload.bookId, 10);
		const sql2 = `DELETE FROM bookings WHERE id ='${id}' AND email = '${this.payload.email}'`;
		const { rows } = await Db.query(sql2);
		if (!rows) {
			this.result = { status: 401, message: 'You are not allowed to delete this booking.' };
			return false;
		}
		this.result = { status: 200, message: 'You have successfully deletes this booking.' };
		return true;
	}
}

export default Bookings;

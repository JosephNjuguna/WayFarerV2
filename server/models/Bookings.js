/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
import db from '../Db/bookings';
import tripDb from '../Db/trips';
import date from '../helpers/Date';

class Bookings {
	constructor(payload = null) {
		this.payload = payload;
		this.result = null;
	}

	async bookaSeat() {
		const tripInfo = parseInt(this.payload.tripId);
		const seatNo = parseInt(this.payload.seatNumber);
		const obj = tripDb.find(o => o.id === tripInfo);
		if (!obj) {
			this.result = `Trip Id : ${tripInfo} is not available`;
			return false;
		} else {
			if (seatNo > obj.seatingCapacity || seatNo <= 0) {
				this.result = `Please select seat number less than ${obj.seatingCapacity} and not 0`;
				return false;
			}
			if (obj.tripdate < date.modernDate()) {
				this.result = `Please select a current trip. this trip already happened on date ${obj.tripdate}.`;
				return false;
			} else {
				const findSeat = db.find(o => o.seatNumber === seatNo);
				if (findSeat) {
					this.result = `Seat number : ${findSeat.seatNumber} already taken. choose another seat`;
					return false;
				} else {
					const bookingid = db.length + 1;
					const bookingData = {
						bookingId: bookingid,
						tripId: obj.id,
						userId: this.payload.id,
						busLicensenumber: obj.busLicensenumber,
						tripdate: obj.tripDate,
						firstname: this.payload.firstname,
						lastname: this.payload.lastname,
						email: this.payload.email,
						seatNumber: seatNo,
					};
					db.push(bookingData);
					this.result = bookingData;
					return true;
				}
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
		const bookingId = parseInt(this.payload.bookId);
		const booking = await db.find(o => o.bookingId === bookingId);
		if (booking) {
			if (booking.email === this.payload.email) {
				const user = await db.splice(booking.bookingId - 1, 1);
				return true;
			}
			this.result = { status: 401, message: 'You are not allowed to delete this booking.' };
			return false;
		}
		this.result = { status: 404, message: `Booking Id : ${bookingId} not found` };
		return false;
	}
}

export default Bookings;

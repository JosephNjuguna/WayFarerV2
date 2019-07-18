/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable radix */
import db from '../MockData/trips';
import date from '../helpers/Date';

class Trips {
	constructor(payload = null) {
		this.payload = payload;
		this.result = null;
	}

	async createTrip() {
		const tripId = db.length + 1;
		const bookingData = {
			id: tripId,
			seatingCapacity: this.payload.seatingCapacity,
			busLicensenumber: this.payload.busLicensenumber,
			origin: this.payload.origin,
			destination: this.payload.destination,
			tripDate: this.payload.tripDate,
			fare: parseInt(this.payload.fare),
			status: 'active',
		};
		if (this.payload.tripDate < date.modernDate()) {
			this.result = { status: 400, message: `Please enter a valid date. You have entered a past date.` };
			return false;
		} else {
			const obj = db.find(o => o.busLicensenumber === this.payload.busLicensenumber || o.tripDate === this.payload.tripDate);
			if (!obj) {
				db.push(bookingData);
				this.result = bookingData;
				return true;
			} else {
				this.result = { status: 409, message: 'Trip already exist.' };
				return false;
			}
		}
	}
}

export default Trips;

/* eslint-disable consistent-return */
import TripModel from '../models/Trips';
import reqResponses from '../helpers/Responses';

class Trip {
	static async createTrip(req, res) {
		try {
			const {
				seatingCapacity,
				busLicensenumber,
				origin,
				destination,
				tripDate,
				fare,
			} = req.body;
			// eslint-disable-next-line max-len
			// eslint-disable-next-line new-cap
			const addTrip = new TripModel({
				seatingCapacity, busLicensenumber, origin, destination, tripDate, fare,
			});
			if (!await addTrip.createTrip()) {
				return reqResponses.handleError(addTrip.result.status, addTrip.result.message, res);
			}
			return reqResponses.handleSuccess(201, 'Trip created successfully', addTrip.result, res);
		} catch (error) {
			return reqResponses.internalError(res);
		}
	}
}

export default Trip;

/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
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

	static async cancelTrip(req, res) {
		try {
			const tripStatus = req.body.status;
			const tripId = req.params.id;
			const cancelTrip = new TripModel({ tripStatus, tripId });
			if (!await cancelTrip.cancelTrip()) {
				return reqResponses.handleError(cancelTrip.result.status, cancelTrip.result.message, res);
			}
			return reqResponses.handleSuccess(200, 'Trip cancelled successfully', cancelTrip.result, res);
		} catch (error) {
			return reqResponses.internalError(res);
		}
	}

	static async viewAlltrips(req, res) {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.userData = decoded;
		if (req.userData.isadmin === 'true') {
			const viewTrips = new TripModel();
			if (!await viewTrips.viewAlltrips()) {
				return reqResponses.handleError(404, 'No Trips record found', res);
			}
			return reqResponses.handleSuccess(200, 'success', viewTrips.result, res);
		}
		const viewTrips = new TripModel();
		if (!await viewTrips.viewActivetrips()) {
			return reqResponses.handleError(404, 'No Trips record found', res);
		}
		return reqResponses.handleSuccess(200, 'success', viewTrips.result, res);
	}

	static async viewSingletrip(req, res) {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.userData = decoded;
		if (req.userData.isadmin === 'true') {
			const tripId = req.params.id;
			const singleTrip = new TripModel(tripId);
			if (!await singleTrip.viewSingletrip()) {
				return reqResponses.handleError(404, 'Trip Id not found', res);
			}
			return reqResponses.handleSuccess(200, 'success', singleTrip.result, res);
		}
		const tripId = req.params.id;
		const singleTrip = new TripModel(tripId);
		if (!await singleTrip.viewSingleActivetrip()) {
			return reqResponses.handleError(404, 'Trip Id not found', res);
		}
		return reqResponses.handleSuccess(200, 'success', singleTrip.result, res);
	}

	static async filterOrigin(req, res) {
		const trip = req.params.route;
		const filteredTrip = new TripModel({ trip });
		if (!await filteredTrip.filterOrigin()) {
			return reqResponses.notFound(`Trip origin : '${trip} not found.`, res);
		}
		return reqResponses.handleSuccess(200, 'success', filteredTrip.result, res);
	}

	static async filterDestination(req, res) {
		const trip = req.params.route;
		const filteredTrip = new TripModel({ trip });
		if (!await filteredTrip.filterDestination()) {
			return reqResponses.notFound(`Trip destination: '${trip} not found.`, res);
		}
		return reqResponses.handleSuccess(200, 'success', filteredTrip.result, res);
	}
}

export default Trip;

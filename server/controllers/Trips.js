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
		const viewTrips = await TripModel.viewAlltrips();
		if (!viewTrips) {
			return reqResponses.handleError(404, 'No Trips record found', res);
		}
		return reqResponses.handleSuccess(200, 'success', viewTrips, res);
	}

	static async viewSingletrip(req, res) {
		const tripId = req.params.id;
		const singleTrip = await TripModel.viewSingletrip(tripId);
		if (!singleTrip) {
			return reqResponses.handleError(404, 'Trip Id not found', res);
		}
		return reqResponses.handleSuccess(200, 'success', singleTrip, res);
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

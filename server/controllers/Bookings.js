import jwt from 'jsonwebtoken';
import BookingModel from '../models/Bookings';
import reqResponses from '../helpers/Responses';

class Bookings {
	static async bookSeat(req, res) {
		try {
			const {
				tripId,
				seatNumber,
			} = req.body;
			const token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_KEY);
			req.userData = decoded;
			const {
				email, firstname, lastname, id,
			} = req.userData;
			// eslint-disable-next-line max-len
			const bookingSeat = new BookingModel({
				tripId, email, firstname, lastname, id, seatNumber,
			});
			if (!await bookingSeat.bookaSeat()) {
				return reqResponses.notFound(bookingSeat.result, res);
			}
			return reqResponses.handleSuccess(201, 'Booked successfully', bookingSeat.result, res);
		} catch (error) {
			return reqResponses.internalError(res);
		}
	}

	static async userAllBooking(req, res) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_KEY);
			req.userData = decoded;
			const { email } = req.userData;
			const viewBookings = new BookingModel({ email });
			if (!await viewBookings.userAllBooking()) {
				return reqResponses.notFound(`${req.userData.firstname}, you dont have any Booking records`, res);
			}
			return reqResponses.handleSuccess(200, 'success', viewBookings.result, res);
		} catch (error) {
			return reqResponses.internalError(res);
		}
	}

	static async viewAllBooking(req, res) {
		try {
			const viewBookings = await BookingModel.viewAllBooking();
			if (!viewBookings) {
				return reqResponses.handleError(404, 'No Booking records found', res);
			}
			return reqResponses.handleSuccess(200, 'success', viewBookings, res);
		} catch (error) {
			return reqResponses.internalError(res);
		}
	}
}

export default Bookings;

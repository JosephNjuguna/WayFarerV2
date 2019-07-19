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
}

export default Bookings;

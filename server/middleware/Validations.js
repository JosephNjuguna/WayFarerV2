/* eslint-disable consistent-return */
import BaseJoi from '@hapi/joi';
import Extension from '@hapi/joi-date';
import reqResponses from '../helpers/Responses';
import Usermodel from '../models/Users';
import TripModel from '../models/Trips';

const Joi = BaseJoi.extend(Extension);
class Validations {
	static validatesignup(req, res, next) {
		const {
			firstname,
			lastname,
			email,
			password,
		} = req.body;

		let re;

		if (!firstname || !lastname || !email || !password) {
			return reqResponses.handleError(400, 'Ensure you have: Firstname, Lastname, Email and Password fields', res);
		}
		if (firstname) {
			re = /[a-zA-Z]{3,}/;
			if (!re.test(firstname)) return reqResponses.handleError(400, 'enter valid firstname, with 3 letters or more', res);
		}
		if (lastname) {
			re = /[a-zA-Z]{3,}/;
			if (!re.test(lastname)) return reqResponses.handleError(400, 'enter valid lastname with 3 letters or more', res);
		}
		if (email) {
			re = /(^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-z]+$)/;
			if (!re.test(email)) return reqResponses.handleError(400, 'enter valid email e.g user@gmail.com', res);
		}
		if (/\s/.test(password)) {
			return reqResponses.handleError(400, 'enter valid password without spaces. should be more than 7 characters, contain letters,numbers and punctuation marks: eg. $@#', res);
		}
		if (password) {
			re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{7,}$/;
			if (!re.test(password)) return reqResponses.handleError(400, 'enter valid password. should be more than 7 characters, contain letters,numbers and punctuation marks: eg. $@#', res);
		}
		next();
	}

	static async validatenewEmail(req, res, next) {
		const {
			email,
		} = req.body;
		const checkEmail = await Usermodel.findByEmail(email);
		if (checkEmail) {
			return reqResponses.handleError(409, 'Users email already exist', res);
		}
		next();
	}

	static validatelogin(req, res, next) {
		const {
			email,
			password,
		} = req.body;

		if (email === '') {
			return reqResponses.handleError(400, 'Please enter email address', res);
		}
		if (password === '') {
			return reqResponses.handleError(400, 'Please enter a password', res);
		}
		next();
	}

	static async validateexistingEmail(req, res, next) {
		const {
			email,
		} = req.body;
		const checkEmail = await Usermodel.login(email);
		if (!checkEmail) {
			return reqResponses.handleError(404, 'No email found', res);
		}
		next();
	}

	static validateTrip(req, res, next) {
		const {
			seatingCapacity,
			busLicensenumber,
			origin,
			destination,
			tripDate,
			fare,
		} = req.body;
		if (!seatingCapacity || !busLicensenumber || !origin || !destination || !tripDate || !fare) {
			return reqResponses.handleError(400, 'Ensure you have: bus seatingCapacity, busLicensenumber, origin, destination, tripDate and fare fields', res);
		}
		const data = req.body;
		const schema = Joi.object().keys({
			seatingCapacity: Joi.string().regex(/^[0-9]*[1-9][0-9]*$/).required().error(new Error('Invalid seating capacity. ensure you have number only e.g 12 or 20')),

			busLicensenumber: Joi.string().required().regex(/^([a-zA-Z])+(\s)+[0-999]+$/).error(new Error('Invalid bus license number.should have this format e.g RAD 123')),

			origin: Joi.string().regex(/^[a-zA-Z]{3,}$/).required().error(new Error('Invalid ORIGIN value. ensure you have strings only.eg kampala')),

			destination: Joi.string().regex(/^[a-zA-Z]{3,}$/).required().error(new Error('Invalid DESTINATION value. ensure you have strings only .eg nairobi')),
			// eslint-disable-next-line newline-per-chained-call
			tripDate: Joi.date().min(new Date()).format(['DD/MM/YYYY', 'DD-MM-YYYY']).iso().required().error(new Error('Invalid DATE. enter a current date and follow this format: DD/MM/YYYY or DD-MM-YYYY e.g 01/01/2019 or 01-01-2019')),

			fare: Joi.string().regex(/^[0-9]*[1-9][0-9]*$/).required().error(new Error('Invalid fare value. ensure you have numbers only. eg 2000')),
		});
		if (origin === destination) {
			return reqResponses.handleError(400, 'Please confirm your trip origin and destination please. they shouldn`t be the same', res);
		}
		Joi.validate(data, schema, (err) => {
			if (err) {
				return res.status(400).json({
					message: err.message,
				});
			}
			next();
		});
	}

	static async checkTrip(req, res, next) {
		const {
			busLicensenumber,
			tripDate,
		} = req.body;
		const checkTripexist = await TripModel.findTrip(busLicensenumber, tripDate);
		if (checkTripexist) {
			return reqResponses.handleError(409, 'Trip Already exist', res);
		}
		next();
	}

	static validateTripBooking(req, res, next) {
		const {
			tripId,
			seatNumber,
		} = req.body;
		let re;

		if (tripId === '' || seatNumber === '') {
			return reqResponses.handleError(400, 'Ensure you have Tripid and Seatnumber you want to book.', res);
		}

		if (tripId) {
			// eslint-disable-next-line radix
			re = /^[0-9]*$/;
			if (!re.test(tripId)) return reqResponses.handleError(400, 'Ensure tripid is a number e.g 1,2,3 not a string or decimal e.g 0.9 or 9.8', res);
		}

		if (seatNumber) {
			// eslint-disable-next-line radix
			re = /^[0-9]*$/;
			if (!re.test(seatNumber)) return reqResponses.handleError(400, 'Ensure seatNumber is a number e.g 1,2,3 not a string or decimal e.g 0.9 or 9.8', res);
		}
		next();
	}

	static checkId(req, res, next) {
		const { id } = req.params;
		let re;
		if (id) {
			re = /^[0-9]*$/;
			if (!re.test(id)) return reqResponses.handleError(400, 'enter a valid id, not a string', res);
		}
		next();
	}

	static checkRoute(req, res, next) {
		const { route } = req.params;
		let re;
		if (route) {
			re = /^[a-zA-Z]{3,}$/;
			if (!re.test(route)) return reqResponses.handleError(400, 'enter a valid route. not less than 3 characters and should be letters only', res);
		}
		next();
	}
}

export default Validations;

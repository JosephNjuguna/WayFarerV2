/* eslint-disable consistent-return */
import reqResponses from '../helpers/Responses';
import Usermodel from '../models/Users';

class Validations {
	static validatesignup(req, res, next) {
		try {
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
			if (password) {
				re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{7,}$/;
				if (!re.test(password)) return reqResponses.handleError(400, 'enter valid password. should be more than 7 characters, contain letters,numbers and punctuation marks: eg. $@#', res);
			}
			next();
		} catch (error) {
			return reqResponses.handleError(error.toString(), 500, res);
		}
	}

	static async validatenewEmail(req, res, next) {
		try {
			const {
				email,
			} = req.body;
			const checkEmail = await Usermodel.findByEmail(email);
			if (checkEmail) {
				return reqResponses.handleError(409, 'Users email already exist', res);
			}
			next();
		} catch (error) {
			return reqResponses.handleError(500, error.toString(), res);
		}
	}
}

export default Validations;

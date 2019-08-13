import Usermodel from '../models/Users';
import EncryptData from '../helpers/Encrypt';
import reqResponses from '../helpers/Responses';
import jwtGen from '../helpers/Jwt';

class Users {
	static async signup(req, res) {
		try {
			const {
				firstname,
				lastname,
				email,
				password,
			} = req.body;
			const hashedPassword = EncryptData.generateHash(password);
			const addUser = new Usermodel({
				firstname, lastname, email, hashedPassword,
			});
			if (await addUser.signup()) {
				const token = jwtGen.generateToken(addUser.result.id, addUser.result.email, addUser.result.firstname, addUser.result.lastname, addUser.result.isadmin);
				const user = {
					firstname: addUser.result.firstname,
					lastname: addUser.result.lastname,
					email: addUser.result.email,
					id: addUser.result.id,
					token,
				};
				return reqResponses.handleSuccess(201, 'successfully signed up', user, res);
			}
			return reqResponses.handleError(409, 'user exist', res);
		} catch (error) {
			return reqResponses.internalError(res);
		}
	}

	static async login(req, res) {
		try {
			const incomingEmail = req.body.email;
			// eslint-disable-next-line prefer-destructuring
			const password = req.body.password;
			const userLogin = await Usermodel.login(incomingEmail);
			const {
				id, email, firstname, lastname, isadmin,
			} = userLogin;
			if (EncryptData.validPassword(password, userLogin.password)) {
				const token = jwtGen.generateToken(id, email, firstname, lastname, isadmin);
				const userdata = {
					id,
					firstname,
					lastname,
					email,
					token,
				};
				return reqResponses.handleSuccess(200, `welcome ${firstname}`, userdata, res);
			}
			return reqResponses.handleError(401, 'Kindly check your email and password', res);
		} catch (error) {
			return reqResponses.handleError(500, error.toString(), res);
		}
	}
}

export default Users;

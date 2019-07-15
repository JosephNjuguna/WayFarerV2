/* eslint-disable max-len */
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
				const token = jwtGen.generateToken(addUser.result.id, addUser.result.email, addUser.result.firstname, addUser.result.lastname);
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
}

export default Users;

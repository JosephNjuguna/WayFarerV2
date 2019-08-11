/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import reqResponses from '../helpers/Responses';

dotenv.config();

class AuthValidator {
	static async checkAdmin(req, res, next) {
		const tokenData = req.headers.authorization;
		if (!tokenData || tokenData === null || tokenData === '') {
			return reqResponses.handleError(400, 'Token required', res);
			// eslint-disable-next-line no-else-return
		} else {
			const token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_KEY);
			req.userData = decoded;
			if (req.userData.isadmin === 'true') {
				next();
			} else {
				return res.status(403).json({
					message: 'Access Denied!',
				});
			}
		}
	}

	static async checkUser(req, res, next) {
		const tokenData = req.headers.authorization;
		if (!tokenData || tokenData === null || tokenData === '') {
			return reqResponses.handleError(400, 'Token required', res);
			// eslint-disable-next-line no-else-return
		} else {
			const token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_KEY);
			req.userData = decoded;
			next();
		}
	}
}

export default AuthValidator;

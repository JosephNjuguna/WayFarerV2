import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Token {
	static generateToken(id, email, firstname, lastname, isadmin) {
		const payload = {
			id, email, firstname, lastname, isadmin,
		};
		const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 * 7 });
		return token;
	}
}

export default Token;

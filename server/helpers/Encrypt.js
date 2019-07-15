import bcrypt from 'bcrypt';

class EncryptData {
	static generateHash(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	}
}

export default EncryptData;

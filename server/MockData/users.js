import dotenv from 'dotenv';
import EncryptData from '../helpers/Encrypt';

const hashedPassword = EncryptData.generateHash(process.env.password);

dotenv.config();
const users = [
	{
		id: 1,
		firstname: 'main',
		lastname: 'admin',
		email: 'admin123@gmail.com',
		password: hashedPassword,
		isAdmin: true,
	},
	{
		id: 2,
		firstname: 'Joseph',
		lastname: 'Njuguna',
		email: 'josephnjuguna482@gmail.com',
		password: hashedPassword,
		isAdmin: false,
	},
];

export default users;

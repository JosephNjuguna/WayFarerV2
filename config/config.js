// 'dev' or 'test'
import dotenv from 'dotenv';

const env = process.env.NODE_ENV;

dotenv.config();

const dev = {
	db: process.env.DATABASE_URL,
};

const test = {
	db: process.env.DATABASE_TEST_URL,
};

const config = {
	dev,
	test,
};

module.exports = config[env];

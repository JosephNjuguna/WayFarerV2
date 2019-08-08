import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../app';
import Db from '../Db/Db';

import EncryptData from '../helpers/Encrypt';

dotenv.config();
chai.should();
chai.use(chaiHttp);

const hashedPassword = EncryptData.generateHash(process.env.password);

const user = {
	firstname: 'test',
	lastname: 'test',
	email: 'test2@mail.com',
	password: hashedPassword,
	isAdmin: false,
};

describe('/AUTHENTICATION', () => {
	before('add user', async (done) => {
		Db.query('INSERT INTO users (firstname, lastname, email, password, isAdmin) values($1, $2, $3, $4, $5)',
			[user.firstname, user.lastname, user.email, user.password, user.isAdmin]);
		done();
	});

	after('after all test', (done) => {
		Db.query('DELETE FROM users');
		Db.query('DROP TABLE IF EXISTS users');
		done();
	});

	describe('/POST signup', () => {
		it('should check user has firstname', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send({
					firstname: '',
					lastname: 'testlastname',
					email: 'test1@mail.com',
					password: 'qwerQ@q123',
				})
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should check user has lastname', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send({
					firstname: 'testfirstname',
					lastname: '',
					email: 'test1@mail.com',
					password: 'qwerQ@qwerre123',
				})
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should check user has email', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send({
					firstname: 'testfirstname',
					lastname: 'testlastname',
					email: '',
					password: 'qwerQ@qwerre123',
				})
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should check user has password', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send({
					firstname: 'testfirstname',
					lastname: 'testlastname',
					email: 'test1@mail.com',
					password: '',
				})
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should successfully sign up user', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send({
					firstname: 'testfirstname',
					lastname: 'testlastname',
					email: 'test1@mail.com',
					password: 'qwerQ@qwerre123',
				})
				.end((err, res) => {
					res.should.have.status(201);
					if (err) return done();
					done();
				});
		});

		it('should check user already exist', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send({
					firstname: 'Joseph',
					lastname: 'Njuguna',
					email: 'test1@mail.com',
					password: 'qwerQ@qwerre123',
				})
				.end((err, res) => {
					res.should.have.status(409);
					if (err) return done();
					done();
				});
		});
	});

	describe('/POST login', () => {
		it('should have user email', (done) => {
			chai.request(app)
				.post('/api/v1/login')
				.send({
					email: '',
					password: 'qwerQ@qwerre123',
				})
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should have user password ', (done) => {
			chai.request(app)
				.post('/api/v1/login')
				.send({
					email: 'test1@mail.com',
					password: '',
				})
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should not log in non-existing email', (done) => {
			chai.request(app)
				.post('/api/v1/login')
				.send({
					email: 'test1121333@mail.com',
					password: 'qwerQ@qwerre123',
				}).end((err, res) => {
					res.should.have.status(404);
					if (err) return done();
					done();
				});
		});

		it('should successfully log in user', (done) => {
			chai.request(app)
				.post('/api/v1/login')
				.send({
					email: 'josephnjuguna482@gmail.com',
					password: 'qwerQ@qwerre123',
				}).end((err, res) => {
					res.should.have.status(200);
					if (err) return done();
					done();
				});
		});

		it('should check user password mismatch', (done) => {
			chai.request(app)
				.post('/api/v1/login')
				.send({
					email: 'josephnjuguna482@gmail.com',
					password: 'qwerQ@qwerre1VFSdcSvcVS3',
				}).end((err, res) => {
					res.should.have.status(401);
					if (err) return done();
					done();
				});
		});
	});
});

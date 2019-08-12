import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import Db from '../Db/Db';
import userMockdata from '../MockData/users';

chai.should();
chai.use(chaiHttp);

describe('/AUTHENTICATION', () => {
	before('add user', async (done) => {
		Db.query('INSERT INTO users (firstname, lastname, email, password, isAdmin) values($1, $2, $3, $4, $5)',
			// eslint-disable-next-line max-len
			[userMockdata.user.firstname, userMockdata.user.lastname, userMockdata.user.email, userMockdata.user.password, 'false']);
		done();
	});

	after('after all test', (done) => {
		Db.query('DELETE FROM users');
		done();
	});

	describe('/POST signup', () => {
		it('should check user has firstname', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send(userMockdata.user1)
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should check user has lastname', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send(userMockdata.user2)
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should check user has email', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send(userMockdata.user3)
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should check user has password', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send(userMockdata.user4)
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should successfully sign up user', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send(userMockdata.user6)
				.end((err, res) => {
					res.should.have.status(201);
					if (err) return done();
					done();
				});
		});

		it('should check user already exist', (done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.send(userMockdata.user)
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
				.send(userMockdata.user3)
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should have user password ', (done) => {
			chai.request(app)
				.post('/api/v1/login')
				.send(userMockdata.user4)
				.end((err, res) => {
					res.should.have.status(400);
					if (err) return done();
					done();
				});
		});

		it('should not log in non-existing email', (done) => {
			chai.request(app)
				.post('/api/v1/login')
				.send(userMockdata.nonuser)
				.end((err, res) => {
					res.should.have.status(404);
					if (err) return done();
					done();
				});
		});

		it('should successfully log in user', (done) => {
			chai.request(app)
				.post('/api/v1/login')
				.send(userMockdata.userlogin).end((err, res) => {
					res.should.have.status(200);
					if (err) return done();
					done();
				});
		});

		it('should check user password mismatch', (done) => {
			chai.request(app)
				.post('/api/v1/login')
				.send(userMockdata.user5).end((err, res) => {
					res.should.have.status(401);
					if (err) return done();
					done();
				});
		});
	});
});

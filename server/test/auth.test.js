import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);


describe('/AUTHENTICATION', () => {
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
					email: 'josephnjuguna482@gmail.com',
					password: 'qwerQ@qwerre123',
				})
				.end((err, res) => {
					res.should.have.status(409);
					if (err) return done();
					done();
				});
		});
	});
});

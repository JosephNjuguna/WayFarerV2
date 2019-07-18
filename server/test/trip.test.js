/* eslint-disable max-len */
/* eslint-disable new-cap */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import Token from '../helpers/Jwt';

chai.should();
chai.use(chaiHttp);

const user = {
	id: 2,
	firstname: 'test',
	lastname: 'test',
	email: 'test1@mail.com',
	isAdmin: false,
};
const adminToken = Token.generateToken(1, 'admin@wayfarer.com', 'admin', 'admin', true);
const userToken = Token.generateToken(3, user.email, user.firstname, user.lastname, user.isAdmin);

describe('/TRIPS', () => {
	before('generate token', async (done) => {
		done();
	});

	it('should show that token is required', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', ``)
			.send({
				seatingCapacity: 14,
				busLicensenumber: 'RAD 129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '1/7/2019',
				fare: 3500,
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that only admin is allowed on this endpoint', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				seatingCapacity: 14,
				busLicensenumber: 'RAD 129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '1/7/2019',
				fare: 3500,
			})
			.end((err, res) => {
				res.should.have.status(403);
				if (err) return done();
				done();
			});
	});

	it('should show that the date is invalid or its a past date', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				seatingCapacity: 14,
				busLicensenumber: 'RAD 129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '1/7/2019',
				fare: 3500,
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should successfully create a trip', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				seatingCapacity: 14,
				busLicensenumber: 'RAD 129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '19/7/2019',
				fare: 3500,
			})
			.end((err, res) => {
				res.should.have.status(201);
				if (err) return done();
				done();
			});
	});

	it('should successfully show that a trip already exist', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				seatingCapacity: 14,
				busLicensenumber: 'RAD 129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '19/7/2019',
				fare: 3500,
			})
			.end((err, res) => {
				res.should.have.status(409);
				if (err) return done();
				done();
			});
	});
});

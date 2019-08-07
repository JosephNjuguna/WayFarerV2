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

describe('/TRIPS AND BOOKINGS', () => {
	before('generate token', async (done) => {
		done();
	});

	it('should check no trips record', (done) => {
		chai.request(app)
			.get('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should check no active trips record by user', (done) => {
		chai.request(app)
			.get('/api/v1/trips')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
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

	it('should show that all seats are required', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send({})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that seating capacity is invalid', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				seatingCapacity: 'fkfjkjfd',
				busLicensenumber: 'RAD 129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '01/07/2019',
				fare: '3500',
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that seating capacity is invalid', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				seatingCapacity: '12',
				busLicensenumber: 'RAD129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '01/07/2019',
				fare: '3500',
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that origin is invalid', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				seatingCapacity: 'fkfjkjfd',
				busLicensenumber: 'RAD 129',
				origin: '121331edasdce',
				destination: 'NAIROBI',
				tripDate: '01/07/2019',
				fare: '3500',
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that destination is invalid', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				seatingCapacity: 'fkfjkjfd',
				busLicensenumber: 'RAD 129',
				origin: 'Kigali',
				destination: '121331edasdce',
				tripDate: '01/07/2019',
				fare: '3500',
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that the date is invalid or its a past date', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				seatingCapacity: '14',
				busLicensenumber: 'RAD 129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '01/07/2019',
				fare: '3500',
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that fare is invalid', (done) => {
		chai.request(app)
			.post('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				seatingCapacity: '14',
				busLicensenumber: 'RAD 129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '01/07/2019',
				fare: 'dkjknmekrkj',
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
				seatingCapacity: '14',
				busLicensenumber: 'RAD 129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '31/08/2019',
				fare: '3500',
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
				seatingCapacity: '14',
				busLicensenumber: 'RAD 129',
				origin: 'KIGALI',
				destination: 'NAIROBI',
				tripDate: '31/08/2019',
				fare: '3500',
			})
			.end((err, res) => {
				res.should.have.status(409);
				if (err) return done();
				done();
			});
	});

	it('should check id is not valid', (done) => {
		chai.request(app)
			.patch(`/api/v1/trips/onehundreds/cancel`)
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				status: 'canceled',
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should check id is not available', (done) => {
		chai.request(app)
			.patch(`/api/v1/trips/${100000}/cancel`)
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				status: 'canceled',
			})
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should show that token is required', (done) => {
		chai.request(app)
			.get('/api/v1/trips')
			.set('authorization', ``)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should check all trips admin', (done) => {
		chai.request(app)
			.get('/api/v1/trips')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should check only active trips', (done) => {
		chai.request(app)
			.get('/api/v1/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should check single trip', (done) => {
		chai.request(app)
			.get('/api/v1/trips/1')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should check single active trip user', (done) => {
		chai.request(app)
			.get('/api/v1/trips/1')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should filter trip by origin', (done) => {
		chai.request(app)
			.get('/api/v1/origin/KIGALI')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should show invalid trip origin', (done) => {
		chai.request(app)
			.get('/api/v1/origin/1234')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show trip not found by origin', (done) => {
		chai.request(app)
			.get('/api/v1/origin/NAIROBI')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should show invalid trip destination', (done) => {
		chai.request(app)
			.get('/api/v1/destination/1234')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should filter trip by destination', (done) => {
		chai.request(app)
			.get('/api/v1/destination/NAIROBI')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should show trip not found by destination', (done) => {
		chai.request(app)
			.get('/api/v1/destination/KIGALI')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should check invalid trip id', (done) => {
		chai.request(app)
			.get('/api/v1/trips/onetwothree')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should check trip not found', (done) => {
		chai.request(app)
			.get('/api/v1/trips/10000')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully show a trip is not found', (done) => {
		chai.request(app)
			.post('/api/v1/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: 100,
				seatNumber: 1,
			})
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user that a seat is not available', (done) => {
		chai.request(app)
			.post('/api/v1/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: 1,
				seatNumber: 20,
			})
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully show a trip is not found available due to date', (done) => {
		chai.request(app)
			.post('/api/v1/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: 3,
				seatNumber: 1,
			})
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully show admin no bookings record found on Wayfarer', (done) => {
		chai.request(app)
			.get('/api/v1/bookings')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user no records of his/her bookings', (done) => {
		chai.request(app)
			.get('/api/v1/userbookings')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should test that tripId input is empty', (done) => {
		chai.request(app)
			.post('/api/v1/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: '',
				seatNumber: 1,
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should test that a seatNumber input is empty', (done) => {
		chai.request(app)
			.post('/api/v1/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: 1,
				seatNumber: '',
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should test a valid tripid', (done) => {
		chai.request(app)
			.post('/api/v1/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: 1.9,
				seatNumber: 1,
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should test a valid seatNumber', (done) => {
		chai.request(app)
			.post('/api/v1/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: 1,
				seatNumber: '13lkjv',
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should successfully book a trip', (done) => {
		chai.request(app)
			.post('/api/v1/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: 1,
				seatNumber: 1,
			})
			.end((err, res) => {
				res.should.have.status(201);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user that a seat is taken', (done) => {
		chai.request(app)
			.post('/api/v1/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: 1,
				seatNumber: 1,
			})
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user his/her bookings', (done) => {
		chai.request(app)
			.get('/api/v1/userbookings')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should successfully show admin all bookings on Wayfarer', (done) => {
		chai.request(app)
			.get('/api/v1/bookings')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user no trip id record found for his/her booking', (done) => {
		chai.request(app)
			.delete('/api/v1/bookings/1000000')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully invalid booking id', (done) => {
		chai.request(app)
			.delete('/api/v1/bookings/one')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user that trip booking is deleted', (done) => {
		chai.request(app)
			.delete('/api/v1/bookings/1')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should show invalid trip id', (done) => {
		chai.request(app)
			.patch(`/api/v1/trips/adrer/cancel`)
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				status: 'canceled',
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show  trip id not found', (done) => {
		chai.request(app)
			.patch(`/api/v1/trips/${100000}/cancel`)
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				status: 'canceled',
			})
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully cancel a trip', (done) => {
		chai.request(app)
			.patch(`/api/v1/trips/${1}/cancel`)
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				status: 'canceled',
			})
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should check if trip is successfully canceled', (done) => {
		chai.request(app)
			.patch(`/api/v1/trips/${1}/cancel`)
			.set('authorization', `Bearer ${adminToken}`)
			.send({
				status: 'canceled',
			})
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should not book a canceled trip', (done) => {
		chai.request(app)
			.post('/api/v1/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: 1,
				seatNumber: 1,
			})
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});
});

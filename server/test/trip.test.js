/* eslint-disable max-len */
/* eslint-disable new-cap */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import Token from '../helpers/Jwt';
import Db from '../Db/Db';
import tripMockdata from '../MockData/trips';
import bookingData from '../MockData/bookings';
import userMockdata from '../MockData/users';

chai.should();
chai.use(chaiHttp);

const adminToken = Token.generateToken(1, 'admin@wayfarer.com', 'admin', 'admin', 'true');
const userToken = Token.generateToken(2, userMockdata.user.email, userMockdata.user.firstname, userMockdata.user.lastname, userMockdata.user.password, userMockdata.user.isAdmin);

describe('/TRIPS AND BOOKINGS', () => {
	after('after all test', (done) => {
		Db.query('DELETE FROM trips, bookings');
		Db.query('DROP TABLE IF EXISTS trips, bookings');
		done();
	});

	it('should show that token is required', (done) => {
		chai.request(app)
			.post('/api/v2/trips')
			.set('authorization', ``)
			.send(tripMockdata.trip1)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that only admin is allowed on this endpoint', (done) => {
		chai.request(app)
			.post('/api/v2/trips')
			.set('authorization', `Bearer ${userToken}`)
			.send(tripMockdata.trip1)
			.end((err, res) => {
				res.should.have.status(403);
				if (err) return done();
				done();
			});
	});

	it('should show that all inputs are required', (done) => {
		chai.request(app)
			.post('/api/v2/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send()
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that seating capacity is invalid', (done) => {
		chai.request(app)
			.post('/api/v2/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send(tripMockdata.trip2)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that date is invalid', (done) => {
		chai.request(app)
			.post('/api/v2/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send(tripMockdata.trip3)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that origin is invalid', (done) => {
		chai.request(app)
			.post('/api/v2/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send(tripMockdata.trip4)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that destination is invalid', (done) => {
		chai.request(app)
			.post('/api/v2/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send(tripMockdata.trip5)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show that fare is invalid', (done) => {
		chai.request(app)
			.post('/api/v2/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send(tripMockdata.trip6)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should successfully create a trip', (done) => {
		chai.request(app)
			.post('/api/v2/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send(tripMockdata.trip1)
			.end((err, res) => {
				res.should.have.status(201);
				if (err) return done();
				done();
			});
	});

	it('should successfully show that a trip already exist', (done) => {
		chai.request(app)
			.post('/api/v2/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.send(tripMockdata.trip1)
			.end((err, res) => {
				res.should.have.status(409);
				if (err) return done();
				done();
			});
	});

	it('should check id is not valid', (done) => {
		chai.request(app)
			.patch(`/api/v2/trips/onehundreds/cancel`)
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
			.patch(`/api/v2/trips/${100000}/cancel`)
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
			.get('/api/v2/trips')
			.set('authorization', ``)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should check all trips admin', (done) => {
		chai.request(app)
			.get('/api/v2/trips')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should check only active trips', (done) => {
		chai.request(app)
			.get('/api/v2/trips')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should show no single trip (admin)', (done) => {
		chai.request(app)
			.get('/api/v2/trips/1')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should check single trip (admin)', (done) => {
		chai.request(app)
			.get('/api/v2/trips/1')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should show no single active trip (user)', (done) => {
		chai.request(app)
			.get('/api/v2/trips/1000')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should check single active trip (user)', (done) => {
		chai.request(app)
			.get('/api/v2/trips/1')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should filter trip by origin', (done) => {
		chai.request(app)
			.get('/api/v2/origin/KIGALI')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should show invalid trip origin', (done) => {
		chai.request(app)
			.get('/api/v2/origin/1234')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should show trip not found by origin', (done) => {
		chai.request(app)
			.get('/api/v2/origin/london')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should show invalid trip destination', (done) => {
		chai.request(app)
			.get('/api/v2/destination/1234')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should filter trip by destination', (done) => {
		chai.request(app)
			.get('/api/v2/destination/KIGALI')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should show trip not found by destination', (done) => {
		chai.request(app)
			.get('/api/v2/destination/venice')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should check invalid trip id', (done) => {
		chai.request(app)
			.get('/api/v2/trips/onetwothree')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should check trip not found', (done) => {
		chai.request(app)
			.get('/api/v2/trips/10000')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should test that tripId input is empty', (done) => {
		chai.request(app)
			.post('/api/v2/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send(bookingData.booking1)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should test that a seatNumber input is empty', (done) => {
		chai.request(app)
			.post('/api/v2/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send(bookingData.booking1)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should test that invalid(string) trip id', (done) => {
		chai.request(app)
			.post('/api/v2/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send(bookingData.booking3)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should test that invalid(string) seatnumber', (done) => {
		chai.request(app)
			.post('/api/v2/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send(bookingData.booking4)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should successfully show a trip is not found', (done) => {
		chai.request(app)
			.post('/api/v2/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send(bookingData.booking5)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user that a seat is not available', (done) => {
		chai.request(app)
			.post('/api/v2/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send(bookingData.booking6)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should successfully show a trip is not found available due to date', (done) => {
		chai.request(app)
			.post('/api/v2/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send(bookingData.booking7)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully book a trip', (done) => {
		chai.request(app)
			.post('/api/v2/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send(bookingData.booking8)
			.end((err, res) => {
				res.should.have.status(201);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user that a seat is taken', (done) => {
		chai.request(app)
			.post('/api/v2/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send(bookingData.booking8)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user no records of his/her bookings', (done) => {
		chai.request(app)
			.get('/api/v2/userbookings')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user his/her bookings', (done) => {
		chai.request(app)
			.get('/api/v2/userbookings')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should successfully show admin all bookings on Wayfarer', (done) => {
		chai.request(app)
			.get('/api/v2/bookings')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				if (err) return done();
				done();
			});
	});

	it('should successfully show invalid booking id while deleting booking', (done) => {
		chai.request(app)
			.delete('/api/v2/bookings/one')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				if (err) return done();
				done();
			});
	});

	it('should successfully show user that trip booking is deleted', (done) => {
		chai.request(app)
			.delete('/api/v2/bookings/1')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(204);
				if (err) return done();
				done();
			});
	});

	it('should show invalid trip id', (done) => {
		chai.request(app)
			.patch(`/api/v2/trips/adrer/cancel`)
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
			.patch(`/api/v2/trips/${100000}/cancel`)
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
			.patch(`/api/v2/trips/${1}/cancel`)
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
			.patch(`/api/v2/trips/${1}/cancel`)
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
			.post('/api/v2/bookings')
			.set('authorization', `Bearer ${userToken}`)
			.send({
				tripId: 2,
				seatNumber: 1,
			})
			.end((err, res) => {
				res.should.have.status(404);
				if (err) return done();
				done();
			});
	});
});

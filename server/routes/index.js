import user from './users';
import trips from './trips';
import bookings from './bookings';

const apiPrefix = '/api/v2';
const route = (app) => {
	app.use(apiPrefix, user);
	app.use(apiPrefix, trips);
	app.use(apiPrefix, bookings);
};

export default route;

import user from './users';
import trips from './trips';

const apiPrefix = '/api/v1';
const route = (app) => {
	app.use(apiPrefix, user);
	app.use(apiPrefix, trips);
};

export default route;

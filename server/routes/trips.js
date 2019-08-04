import express from 'express';
import controllers from '../controllers/Trips';
import Auth from '../middleware/Auth';
import validate from '../middleware/Validations';

const router = express.Router();

router.post('/trips', Auth.checkAdmin, validate.validateTrip, controllers.createTrip);
router.patch('/trips/:id/cancel', Auth.checkAdmin, validate.checkId, controllers.cancelTrip);
router.get('/trips', Auth.checkUser, controllers.viewAlltrips);
router.get('/trips/:id', Auth.checkUser, validate.checkId, controllers.viewSingletrip);
router.get('/origin/:route', Auth.checkUser, validate.checkRoute, controllers.filterOrigin);
router.get('/destination/:route', Auth.checkUser, validate.checkRoute, controllers.filterDestination);

export default router;

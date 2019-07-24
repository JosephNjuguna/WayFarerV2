import express from 'express';
import controllers from '../controllers/Trips';
import Auth from '../middleware/Auth';

const router = express.Router();

router.post('/trips', Auth.checkAdmin, controllers.createTrip);
router.patch('/trips/:id/cancel', Auth.checkAdmin, controllers.cancelTrip);
router.get('/trips', Auth.checkUser, controllers.viewAlltrips);
router.get('/trips/:id', Auth.checkUser, controllers.viewSingletrip);
router.get('/origin/:route', Auth.checkUser, controllers.filterOrigin);

export default router;

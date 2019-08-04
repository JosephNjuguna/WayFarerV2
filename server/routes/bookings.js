import express from 'express';
import controllers from '../controllers/Bookings';
import Auth from '../middleware/Auth';
import validate from '../middleware/Validations';

const router = express.Router();

router.post('/bookings', Auth.checkUser, validate.validateTripBooking, controllers.bookSeat);
router.get('/userbookings', Auth.checkUser, controllers.userAllBooking);
router.get('/bookings', Auth.checkAdmin, controllers.viewAllBooking);
router.delete('/bookings/:id', Auth.checkUser, validate.checkId, controllers.deleteBooking);

export default router;

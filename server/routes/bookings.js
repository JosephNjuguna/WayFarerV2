import express from 'express';
import controllers from '../controllers/Bookings';
import Auth from '../middleware/Auth';

const router = express.Router();

router.post('/bookings', Auth.checkUser, controllers.bookSeat);

export default router;

import express from 'express';
import controllers from '../controllers/Trips';
import Auth from '../middleware/Auth';

const router = express.Router();

router.post('/trips', Auth.checkAdmin, controllers.createTrip);
router.patch('/trips/:id/cancel', Auth.checkAdmin, controllers.cancelTrip);

export default router;

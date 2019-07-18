import express from 'express';
import controllers from '../controllers/Trips';
import Auth from '../middleware/Auth';

const router = express.Router();

router.post('/trips', Auth.checkAdmin, controllers.createTrip);

export default router;

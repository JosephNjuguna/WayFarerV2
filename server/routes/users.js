import express from 'express';
import controllers from '../controllers/Users';
import validate from '../middleware/Validations';

const router = express.Router();

router.post('/signup', validate.validatesignup, validate.validatenewEmail, controllers.signup);
router.post('/login', validate.validatelogin, validate.validateexistingEmail, controllers.login);

export default router;

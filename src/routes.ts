import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveryController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveryController();
const sendMailController = new SendMailController();

router.post('/users', userController.create);

router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

router.post('/sendMail', sendMailController.execute);

export { router };

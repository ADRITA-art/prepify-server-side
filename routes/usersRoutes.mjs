import express from 'express';
const router = express.Router();
import userController from '../controller/usersController.mjs';
import auth from '../middlewares/auth.mjs'

router.post('/register', userController.register);
router.post('/login', userController.login);
//router.get('/userId/:userId',userController.userById);
router.get('/me', auth, userController.getMe);

export default router;
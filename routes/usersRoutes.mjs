import express from 'express';
const router = express.Router();
import userController from '../controller/usersController.mjs';

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;
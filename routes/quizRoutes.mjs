import express from 'express';
import auth from '../middlewares/auth.mjs'
import { quizContent } from '../controller/quizController.mjs';

const router = express.Router();

router.post('/generateQuiz',  quizContent);

export default router;
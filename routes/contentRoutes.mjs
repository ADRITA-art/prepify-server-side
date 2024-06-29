import express from 'express';
import auth from '../middlewares/auth.mjs'
import { generateContent } from '../controller/ModulesController.mjs';

const router = express.Router();

router.post('/generateContent', auth, generateContent);

export default router;
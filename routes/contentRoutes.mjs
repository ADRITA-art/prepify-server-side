import express from 'express';
import auth from '../middlewares/auth.mjs'
import { generateContentForInterests } from '../controller/ModulesController.mjs';

const router = express.Router();

router.post('/generateContent', auth, generateContentForInterests);

export default router;
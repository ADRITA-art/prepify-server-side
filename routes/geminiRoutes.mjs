import express from 'express';
const router = express.Router();
import geminiController from '../controller/geminiController.mjs';

router.post('/Modules', geminiController.createModule);

export default router;
import express from 'express'
import verifyjwt from '../middleware/auth.js'
const router = express.Router();
import { getalluserforsidebar } from '../controllers/getusers.js';

router.get('/', verifyjwt, getalluserforsidebar);

export default router; 
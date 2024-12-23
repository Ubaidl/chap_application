import express from 'express'
import verifyjwt from '../middleware/auth.js'
import { sendmessage, getmessage } from '../controllers/sendmessage.js'


const router = express.Router();
router.post('/sendmessage/:id', verifyjwt, sendmessage)
router.get('/getmessage/:id', verifyjwt, getmessage);

export default router;
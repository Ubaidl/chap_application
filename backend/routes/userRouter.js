import express from 'express'
import verifyjwt from '../middleware/auth.js'

const router = express.Router();
import { userregister, userlogin, userlogout } from '../controllers/usercontroller.js'
// router.post('/register', userregister);
router.post('/register', userregister)
router.post('/login', userlogin);
router.post('/logout', verifyjwt, userlogout);
router.get('/try', (req, res) => {
    res.send("i am tyy block");
})



export default router;







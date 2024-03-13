
import express from 'express';
import { userSearch } from '../controllers/userSearch'

const router = express.Router();

router.get('/users/search', userSearch);

export default router;

import { Router } from 'express';
import { handleGetLearnings } from '../controllers/learningController';

const router = Router();

router.get('/learnings', handleGetLearnings);

export default router;

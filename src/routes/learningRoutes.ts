import { Router } from 'express';
import { LearningController } from '../controllers/learningController';

const router = Router();
const controller = new LearningController();

router.get('/learnings', (req, res) => controller.getLearnings(req, res));

export default router;

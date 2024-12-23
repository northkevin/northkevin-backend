import { Router, RequestHandler, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import config from '../config/env';
import { AppError } from '../middleware/errorHandler';

const router = Router();

const loginHandler: RequestHandler = async (req, res, next) => {
    try {
        console.log('Login endpoint hit');
        const { password } = req.body;

        if (!password) {
            throw new AppError('Password is required', 400, 'MISSING_PASSWORD');
        }

        if (password === config.devPassword) {
            console.log('Login successful');
            const token = jwt.sign({ role: 'dev' }, config.jwtSecret, { expiresIn: '24h' });
            res.json({ token });
        }

        throw new AppError('Invalid password', 401, 'INVALID_PASSWORD');
    } catch (error) {
        next(error);
    }
};

router.post('/login', loginHandler);
router.options('/login', cors());

export default router;
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env';

// Add interface for extended Request type
interface AuthRequest extends Request {
    user?: jwt.JwtPayload;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No auth token provided' });
        return;
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            res.status(401).json({ message: 'Invalid or expired token' });
            return;
        }
        req.user = user as jwt.JwtPayload;
        next();
    });
}; 
import { Request, Response } from 'express';
import { getLearnings } from '../services/learningService';

export const handleGetLearnings = async (req: Request, res: Response): Promise<void> => {
    try {
        const limit = parseInt(req.query.limit as string) || 6;
        const cursor = req.query.cursor as string | undefined;

        const response = await getLearnings({ limit, cursor });
        res.json(response);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching learnings',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

import { Request, Response } from 'express';
import { LearningService } from '../services/learningService';

export class LearningController {
    private service: LearningService;

    constructor() {
        this.service = new LearningService();
    }

    async getLearnings(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string) || 6;
            const cursor = req.query.cursor as string | undefined;

            const response = await this.service.getLearnings({ limit, cursor });
            res.json(response);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching learnings',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}

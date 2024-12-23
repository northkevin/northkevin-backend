import { Learning, LearningsResponse, PaginationParams } from '../models/Learning';
import { LearningRepository } from '../repositories/learningRepository';

export class LearningService {
    private repository: LearningRepository;

    constructor() {
        this.repository = new LearningRepository();
    }

    async getLearnings(params: PaginationParams): Promise<LearningsResponse> {
        const { limit, cursor } = params;
        
        const learnings = await this.repository.findPaginated(limit, cursor);
        const total = await this.repository.count();

        const nextCursor = learnings.length === limit 
            ? learnings[learnings.length - 1].date 
            : undefined;

        return {
            learnings,
            nextCursor,
            total
        };
    }
}

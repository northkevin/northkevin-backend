import { Learning, LearningsResponse, PaginationParams } from '../models/Learning';
import { LearningRepository } from '../repositories/learningRepository';

export class LearningService {
    private repository: LearningRepository;

    constructor() {
        this.repository = new LearningRepository();
    }

    async getLearnings(params: PaginationParams): Promise<LearningsResponse> {
        const { limit, cursor } = params;
        
        const paginatedResult = await this.repository.findPaginated(limit, cursor);
        console.log('Repository response:', paginatedResult);
        
        const total = await this.repository.count();

        return {
            learnings: paginatedResult.data,
            nextCursor: paginatedResult.nextCursor,
            total
        };
    }
}

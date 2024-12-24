import { LearningsResponse, PaginationParams } from '../models/Learning';
import { findPaginated, count } from '../repositories/learningRepository';

export const getLearnings = async (params: PaginationParams): Promise<LearningsResponse> => {
    const { limit, cursor } = params;

    const paginatedResult = await findPaginated(limit, cursor);

    const total = await count();

    return {
        learnings: paginatedResult.data,
        nextCursor: paginatedResult.nextCursor,
        total
    };
};

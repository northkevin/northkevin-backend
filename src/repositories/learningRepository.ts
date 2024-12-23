import { Learning } from '../models/Learning';

// This will be replaced with PostgreSQL queries later
export const recentLearnings: Learning[] = [
    // ... existing learnings data ...
];

export class LearningRepository {
    async findAll(): Promise<Learning[]> {
        return recentLearnings;
    }

    async findPaginated(limit: number, cursor?: string): Promise<Learning[]> {
        const sortedLearnings = [...recentLearnings].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        if (!cursor) {
            return sortedLearnings.slice(0, limit);
        }

        const startIndex = sortedLearnings.findIndex(learning =>
            new Date(learning.date).getTime() < new Date(cursor).getTime()
        );

        return sortedLearnings.slice(startIndex, startIndex + limit);
    }

    async count(): Promise<number> {
        return recentLearnings.length;
    }
}

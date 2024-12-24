import { Learning } from '../models/Learning';
import * as fs from 'fs/promises';
import * as path from 'path';

interface PaginatedResult {
    data: Learning[];
    nextCursor?: string;
}

const dataPath = path.join(__dirname, '../data/learnings.json');

const readData = async (): Promise<Learning[]> => {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(data).learnings;
    } catch (error) {
        console.error('Error reading learnings data:', error);
        return [];
    }
};

export const findPaginated = async (limit: number, cursor?: string): Promise<PaginatedResult> => {
    const learnings = await readData();
    const sortedLearnings = [...learnings].sort((a, b) => b.id - a.id);

    if (!cursor) {
        const data = sortedLearnings.slice(0, limit);
        const nextItem = sortedLearnings[limit];
        const nextCursor = nextItem ? nextItem.id.toString() : undefined;
        // console.log('First page - data:', data.map(l => l.id), 'nextCursor:', nextCursor);
        return { data, nextCursor };
    }

    const cursorId = parseInt(cursor);
    // console.log('Looking for items with id <', cursorId);

    const startIndex = sortedLearnings.findIndex(learning => learning.id < cursorId);
    // console.log('Start index:', startIndex);

    if (startIndex === -1) return { data: [] };

    const data = sortedLearnings.slice(startIndex, startIndex + limit);
    const nextCursor = data.length === limit && startIndex + limit < sortedLearnings.length
        ? data[data.length - 1].id.toString()
        : undefined;

    // console.log('Subsequent page - data:', data.map(l => l.id), 'nextCursor:', nextCursor);
    return { data, nextCursor };
};

export const count = async (): Promise<number> => {
    const learnings = await readData();
    return learnings.length;
};

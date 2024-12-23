export interface Learning {
    id: number;
    date: string;
    content: string;
    tags?: string[];
    links?: {
        text: string;
        url: string;
        type: string;
    }[];
}

export interface LearningsResponse {
    learnings: Learning[];
    nextCursor?: string;
    total: number;
}

export interface PaginationParams {
    limit: number;
    cursor?: string;
}
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

export const recentLearnings: Learning[] = [
    {
        id: 6,
        date: '2024-12-20',
        content: 'I had the opportunity to chat with Donnie from Acorn.io this morning on a zoom call.  I\'m excited to see what they\'re building, it looks like it will be a great way for large companies to use AI to leverage their existing data.',
        links: [
            {
                text: 'Acorn.io',
                url: 'https://www.acorn.io/',
                type: 'website'
            }
        ]
    },
    {
        id: 5,
        date: '2024-12-19',
        content: 'I\'m not a designer, but I\'m learning.  My sister is a recent college grad from NAU for a degree in Graphic Design.  I\'m proud of her and when I implemented her feedback for this website, I was shocked at how much better it looked.',
        links: [
            {
                text: 'Karina\'s Design Feedback',
                url: 'https://www.linkedin.com/in/karina-north-0000000000/',
                type: 'linkedin'
            }
        ]
    },
    {
        id: 4,
        date: '2024-12-18',
        content: 'Wrote a leetcode solution for writing Promise.all() in parallel, with O(n) time & O(n) space complexity.',
        links: [
            {
                text: 'Execute Asynchronous Functions in Parallel',
                url: 'https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/solutions/6161593/execute-asynchronous-functions-in-parall-outt',
                type: 'leetcode'
            }
        ]
    },
    {
        id: 3,
        date: '2024-12-17',
        content: 'I was surprised to learn that Chrome browser has no limit on number of promises that can be running at once.  If we don\'t care about durations of a cache existing beyond a single DOM session, it will be faster to use promises for timing out keys than using a Map with expiration dates.',
        links: [
            {
                text: 'Cache With Time Limit',
                url: 'https://leetcode.com/problems/cache-with-time-limit/submissions/1481479162',
                type: 'leetcode'
            }
        ]
    },
    {
        id: 2,
        date: '2024-12-16',
        content: 'Learned javascript\'s native setInterval() executes the given function in the next tick of the event loop.',
        tags: ['javascript', 'til', 'leetcode']
    },
    {
        id: 1,
        date: '2024-12-15',
        content: 'og-image.jpg files can be used for social media link previews. Created mine using a free figma.com account and exported as JPG.',
        tags: ['web', 'seo', 'figma', 'til']
    }
];
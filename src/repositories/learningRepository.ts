import { Learning } from '../models/Learning';

interface PaginatedResult {
    data: Learning[];
    nextCursor?: string;
}

// In-memory data store
const learningsData: Learning[] = [
    {
        id: 9,
        date: "2024-12-23",
        content: "I learned how to organize an Express app better by using MVC and functional programming. I built a paginated API endpoint that works with React Query's infiniteQuery hook. I fixed CORS issues and got everything running smoothly on Railway.com.",
        links: [
            {
                text: "Express.js Docs",
                url: "https://expressjs.com/",
                type: "website"
            }
        ],
        tags: ["fullstack", "cors", "functional-programming"]
    },
    {
        id: 8,
        date: "2024-12-22",
        content: "Had another great design session with my sister today. She helped me completely reorganize the site's layout using her graphic design expertise - focusing on information hierarchy, personal branding in the footer, and strategic placement of call-to-actions. We drew inspiration from Apple's design principles to create the final layout. My site went from a C+ to an A- after implementing her suggestions about gradients, information priority, and layout optimization!",
        links: [
            {
                text: "Karina's Design Expertise",
                url: "https://www.linkedin.com/in/karina-north-0000000000/",
                type: "linkedin"
            }
        ]
    },
    {
        id: 7,
        date: "2024-12-21",
        content: "I discovered AWS Elastic Beanstalk costs around $35/month for production-ready Express apps. After researching alternatives, I learned Railway.com offers free tier production hosting for Express backends. I successfully migrated this site's backend infrastructure to Railway.com and learned their deployment process.",
        links: [
            {
                text: "Railway.app",
                url: "https://railway.app/",
                type: "website"
            }
        ]
    },
    {
        id: 6,
        date: "2024-12-20",
        content: "I had the opportunity to chat with Donnie from Acorn.io this morning on a zoom call.  I'm excited to see what they're building, it looks like it will be a great way for large companies to use AI to leverage their existing data.",
        links: [
            {
                text: "Acorn.io",
                url: "https://www.acorn.io/",
                type: "website"
            }
        ]
    },
    {
        id: 5,
        date: "2024-12-19",
        content: "I'm not a designer, but I'm learning.  My sister is a recent college grad from NAU for a degree in Graphic Design.  I'm proud of her and when I implemented her feedback for this website, I was shocked at how much better it looked.",
        links: [
            {
                text: "Karina's Design Feedback",
                url: "https://www.linkedin.com/in/karina-north-0000000000/",
                type: "linkedin"
            }
        ]
    },
    {
        id: 4,
        date: "2024-12-18",
        content: "Wrote a leetcode solution for writing Promise.all() in parallel, with O(n) time & O(n) space complexity.",
        links: [
            {
                text: "Execute Asynchronous Functions in Parallel",
                url: "https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/solutions/6161593/execute-asynchronous-functions-in-parall-outt",
                type: "leetcode"
            }
        ]
    },
    {
        id: 3,
        date: "2024-12-17",
        content: "I was surprised to learn that Chrome browser has no limit on number of promises that can be running at once.  If we don't care about durations of a cache existing beyond a single DOM session, it will be faster to use promises for timing out keys than using a Map with expiration dates.",
        links: [
            {
                text: "Cache With Time Limit",
                url: "https://leetcode.com/problems/cache-with-time-limit/submissions/1481479162",
                type: "leetcode"
            }
        ]
    },
    {
        id: 2,
        date: "2024-12-16",
        content: "Learned javascript's native setInterval() executes the given function in the next tick of the event loop.",
        tags: [
            "javascript",
            "til",
            "leetcode"
        ]
    },
    {
        id: 1,
        date: "2024-12-15",
        content: "og-image.jpg files can be used for social media link previews. Created mine using a free figma.com account and exported as JPG.",
        tags: [
            "web",
            "seo",
            "figma",
            "til"
        ]
    }
];

const readData = async (): Promise<Learning[]> => {
    return learningsData;
};

export const findPaginated = async (limit: number, cursor?: string): Promise<PaginatedResult> => {
    const learnings = await readData();
    const sortedLearnings = [...learnings].sort((a, b) => b.id - a.id);

    if (!cursor) {
        const data = sortedLearnings.slice(0, limit);
        const nextItem = sortedLearnings[limit];
        const nextCursor = nextItem ? nextItem.id.toString() : undefined;
        return { data, nextCursor };
    }

    const cursorId = parseInt(cursor);
    const startIndex = sortedLearnings.findIndex(learning => learning.id < cursorId);

    if (startIndex === -1) return { data: [] };

    const data = sortedLearnings.slice(startIndex, startIndex + limit);
    const nextCursor = data.length === limit && startIndex + limit < sortedLearnings.length
        ? data[data.length - 1].id.toString()
        : undefined;

    return { data, nextCursor };
};

export const count = async (): Promise<number> => {
    const learnings = await readData();
    return learnings.length;
};

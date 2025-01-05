import { Learning } from "../models/Learning";

interface PaginatedResult {
  data: Learning[];
  nextCursor?: string;
}

// In-memory data store
const learningsData: Learning[] = [
  {
    id: 17,
    date: "2024-03-19",
    content:
      "I took the dive into using Airbnb's Visx library.  I built this whole visualization system that shows my YouTube watch history tags and topics in this super clean interactive display. The fun part was figuring out the logarithmic scaling - makes the word sizes actually make sense instead of being all over the place. Added these real-time controls where you can mess with everything - colors, fonts, even how the words spiral around. Pretty proud of customizing the props to experiment with different layouts, saved me a lot of time alt+tabbing between the code and the browser.",
    links: [
      {
        text: "Visx Word Cloud Guide",
        url: "https://airbnb.io/visx/wordcloud",
        type: "documentation",
      },
      {
        text: "D3 Scale Documentation",
        url: "https://d3js.org/d3-scale",
        type: "documentation",
      },
      {
        text: "React Spring Animation",
        url: "https://www.react-spring.dev/",
        type: "library",
      },
    ],
    tags: ["data-visualization", "react", "d3"],
  },
  {
    id: 16,
    date: "2024-03-18",
    content:
      "I've always wanted to use TanStack React Table and I was able to get it working in under an hour! Set up this whole system for handling my YouTube video data with pagination, sorting and filtering.  My favorite part is how I can enable/disable columns and the table just handles it.  There's 49,000+ videos in my database and it's super fast.  I'm excited to use this in my current and future projects.",
    links: [
      {
        text: "TanStack Table Documentation",
        url: "https://tanstack.com/table/v8",
        type: "documentation",
      },
      {
        text: "React Query Suspense Guide",
        url: "https://tanstack.com/query/latest/docs/react/guides/suspense",
        type: "documentation",
      },
    ],
    tags: ["react", "typescript", "data-management"],
  },

  {
    id: 15,
    date: "2024-01-02",
    content:
      "Finally got my monorepo working smoothly! Split up the TypeScript config between the Node.js backend and React frontend, which was a bit tricky but totally worth it. The coolest part is this stats system I built that crunches through my entire YouTube history - we're talking 7 years of data! Super proud of how modular I made it - I can plug in new analytics stuff without messing with the existing code. Already thinking about how I can use this for podcast data next!",
    links: [
      {
        text: "TypeScript Project References",
        url: "https://www.typescriptlang.org/docs/handbook/project-references.html",
        type: "documentation",
      },
      {
        text: "YouTube Data API",
        url: "https://developers.google.com/youtube/v3",
        type: "api",
      },
    ],
    tags: [
      "typescript",
      "architecture",
      "data-analysis",
      "monorepo",
      "youtube-api",
      "react",
      "nodejs",
    ],
  },
  {
    id: 14,
    date: "2024-01-01",
    content:
      "switched to prisma from raw sql today... man what a difference. was getting tired of writing queries by hand but this orm thing actually handles all the annoying stuff - big numbers for views, json blobs for tags, you name it. kinda went down a rabbit hole setting up the schema but ended up way cleaner than before. pretty wild how the types just sync with typescript now. threw in some watch pattern tracking cause apparently i needed more ways to prove i spend too much time watching tech videos. gonna build some analytics around it or something idk",
    links: [
      {
        text: "Prisma Schema",
        url: "https://www.prisma.io/docs/concepts/components/prisma-schema",
        type: "documentation",
      },
    ],
    tags: ["prisma", "typescript", "database-design", "orm", "data-modeling"],
  },
  {
    id: 13,
    date: "2023-12-31",
    content:
      "so i built this python thing to scrape my entire youtube history... kinda went overboard and pulled 7 years worth lol. had to get clever with the youtube api rate limits cause apparently they dont want you hammering their servers (fair). ended up processing everything in batches which was actually pretty satisfying to watch. now i got this massive dataset with like 3000+ videos - all the nerdy stuff like categories, languages, view counts. gonna use it to build some analytics cause apparently i needed concrete proof of how much time i waste on coding videos",
    links: [
      {
        text: "YouTube Data API Quotas",
        url: "https://developers.google.com/youtube/v3/getting-started#quota",
        type: "documentation",
      },
    ],
    tags: [
      "python",
      "data-engineering",
      "youtube-api",
      "web-scraping",
      "data-processing",
    ],
  },
  {
    id: 12,
    date: "2024-12-30",
    content:
      "Finally ditched my janky JSON files and Python scripts for Obsidian's macOS app - way better for organizing my brain dumps! Love how I can link notes together and see everything mapped out in that cool graph view, plus it's basically Ryan Holiday's notecard system but for nerds like me.",
    links: [
      {
        text: "Ryan Holiday's Notecard System",
        url: "https://ryanholiday.net/the-notecard-system-the-key-for-remembering-organizing-and-using-everything-you-read/",
        type: "website",
      },
      {
        text: "Obsidian",
        url: "https://obsidian.md/",
        type: "website",
      },
    ],
    tags: ["productivity", "note-taking", "research", "tools", "obsidian"],
  },
  {
    id: 11,
    date: "2024-12-29",
    content:
      "Built out a JSON structure to keep track of all the coding videos I watch. Made it so I can tag different parts of the transcripts with stuff like 'cool ideas' or 'need to try this'. Pretty happy with how the data is organized - makes it super easy to search through later and find those 'aha moments' when I need them. Way better than my old method of just dumping everything in random notes.",
    links: [
      {
        text: "JSON Schema Best Practices",
        url: "https://json-schema.org/learn/getting-started-step-by-step",
        type: "website",
      },
    ],
    tags: ["data-structures", "json", "schema-design", "backend"],
  },
  {
    id: 10,
    date: "2024-12-28",
    content:
      "Got my Python scripts working to pull transcripts from YouTube and Vimeo videos! Set up a nice system to organize all the content - can tag important parts and filter through different types of insights (like key points or interesting ideas I want to revisit). Handles both JSON and WebVTT files now, and doesn't break when the transcripts are messy. Going to be super useful for keeping track of all the tech content I watch and building my own knowledge base.",
    links: [
      {
        text: "Content Management Systems Architecture",
        url: "https://www.cms.gov/Research-Statistics-Data-and-Systems/CMS-Information-Technology/XLC/Downloads/SelectingDevelopingtheArchitecture.pdf",
        type: "document",
      },
    ],
    tags: ["cms", "architecture", "content-management", "fullstack"],
  },
  {
    id: 9,
    date: "2024-12-23",
    content:
      "I learned how to organize an Express app better by using MVC and functional programming. I built a paginated API endpoint that works with React Query's infiniteQuery hook. I fixed CORS issues and got everything running smoothly on Railway.com.",
    links: [
      {
        text: "Express.js Docs",
        url: "https://expressjs.com/",
        type: "website",
      },
    ],
    tags: ["fullstack", "cors", "functional-programming"],
  },
  {
    id: 8,
    date: "2024-12-22",
    content:
      "Had another great design session with my sister today. She helped me completely reorganize the site's layout using her graphic design expertise - focusing on information hierarchy, personal branding in the footer, and strategic placement of call-to-actions. We drew inspiration from Apple's design principles to create the final layout. My site went from a C+ to an A- after implementing her suggestions about gradients, information priority, and layout optimization!",
    links: [
      {
        text: "Karina's Design Expertise",
        url: "https://www.linkedin.com/in/karina-north-0000000000/",
        type: "linkedin",
      },
    ],
  },
  {
    id: 7,
    date: "2024-12-21",
    content:
      "I discovered AWS Elastic Beanstalk costs around $35/month for production-ready Express apps. After researching alternatives, I learned Railway.com offers free tier production hosting for Express backends. I successfully migrated this site's backend infrastructure to Railway.com and learned their deployment process.",
    links: [
      {
        text: "Railway.app",
        url: "https://railway.app/",
        type: "website",
      },
    ],
  },
  {
    id: 6,
    date: "2024-12-20",
    content:
      "I had the opportunity to chat with Donnie from Acorn.io this morning on a zoom call.  I'm excited to see what they're building, it looks like it will be a great way for large companies to use AI to leverage their existing data.",
    links: [
      {
        text: "Acorn.io",
        url: "https://www.acorn.io/",
        type: "website",
      },
    ],
  },
  {
    id: 5,
    date: "2024-12-19",
    content:
      "I'm not a designer, but I'm learning.  My sister is a recent college grad from NAU for a degree in Graphic Design.  I'm proud of her and when I implemented her feedback for this website, I was shocked at how much better it looked.",
    links: [
      {
        text: "Karina's Design Feedback",
        url: "https://www.linkedin.com/in/karina-north-0000000000/",
        type: "linkedin",
      },
    ],
  },
  {
    id: 4,
    date: "2024-12-18",
    content:
      "Wrote a leetcode solution for writing Promise.all() in parallel, with O(n) time & O(n) space complexity.",
    links: [
      {
        text: "Execute Asynchronous Functions in Parallel",
        url: "https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/solutions/6161593/execute-asynchronous-functions-in-parall-outt",
        type: "leetcode",
      },
    ],
  },
  {
    id: 3,
    date: "2024-12-17",
    content:
      "I was surprised to learn that Chrome browser has no limit on number of promises that can be running at once.  If we don't care about durations of a cache existing beyond a single DOM session, it will be faster to use promises for timing out keys than using a Map with expiration dates.",
    links: [
      {
        text: "Cache With Time Limit",
        url: "https://leetcode.com/problems/cache-with-time-limit/submissions/1481479162",
        type: "leetcode",
      },
    ],
  },
  {
    id: 2,
    date: "2024-12-16",
    content:
      "Learned javascript's native setInterval() executes the given function in the next tick of the event loop.",
    tags: ["javascript", "til", "leetcode"],
  },
  {
    id: 1,
    date: "2024-12-15",
    content:
      "og-image.jpg files can be used for social media link previews. Created mine using a free figma.com account and exported as JPG.",
    tags: ["web", "seo", "figma", "til"],
  },
];

const readData = async (): Promise<Learning[]> => {
  return learningsData;
};

export const findPaginated = async (
  limit: number,
  cursor?: string
): Promise<PaginatedResult> => {
  const learnings = await readData();
  const sortedLearnings = [...learnings].sort((a, b) => b.id - a.id);

  if (!cursor) {
    const data = sortedLearnings.slice(0, limit);
    const nextItem = sortedLearnings[limit];
    const nextCursor = nextItem ? nextItem.id.toString() : undefined;
    return { data, nextCursor };
  }

  const cursorId = parseInt(cursor);
  const startIndex = sortedLearnings.findIndex(
    (learning) => learning.id < cursorId
  );

  if (startIndex === -1) return { data: [] };

  const data = sortedLearnings.slice(startIndex, startIndex + limit);
  const nextCursor =
    data.length === limit && startIndex + limit < sortedLearnings.length
      ? data[data.length - 1].id.toString()
      : undefined;

  return { data, nextCursor };
};

export const count = async (): Promise<number> => {
  const learnings = await readData();
  return learnings.length;
};

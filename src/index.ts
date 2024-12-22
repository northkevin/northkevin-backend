import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 8080;

// Secret key for JWT signing - in production this would be an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'northkevin-jwt-secret-key-2024-03-17';

if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET environment variable not set. Using fallback secret.');
}

// Use environment variable instead of hardcoded password
const DEV_PASSWORD = process.env.DEV_PASSWORD || 'fallback-during-development';

if (!process.env.DEV_PASSWORD) {
  console.warn('Warning: DEV_PASSWORD environment variable not set. Using fallback password.');
}

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Mock data for brain upgrades (recent learnings)
const recentLearnings = [
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

// GET endpoint for brain upgrades
app.get('/api/brain-upgrades', (req, res) => {
  res.json(recentLearnings);
});

// GET endpoint for a specific brain upgrade by ID
app.get('/api/brain-upgrades/:id', (req, res) => {
  const learning = recentLearnings.find(l => l.id === parseInt(req.params.id));
  if (learning) {
    res.json(learning);
  } else {
    res.status(404).json({ message: 'Brain upgrade not found' });
  }
});

// Simple dev authentication setup
// Using a hardcoded password and JWT for stateless auth
// Note: This is NOT suitable for production or sensitive data!


// Middleware to check JWT auth token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No auth token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Login endpoint that returns JWT token
app.post('/api/dev/login', (req, res) => {
  const { password } = req.body;

  if (password === DEV_PASSWORD) {
    // Generate JWT token valid for 24 hours
    const token = jwt.sign({ role: 'dev' }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
});

// Example protected dev endpoint
app.get('/api/dev/protected', authenticateToken, (req, res) => {
  res.json({ message: 'You have access to dev endpoints!' });
});

/* 
Frontend usage example:

1. Login and store token:
fetch('/api/dev/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password: 'your-secret-password-here' })
})
.then(res => res.json())
.then(data => localStorage.setItem('devToken', data.token));

2. Use token for protected requests:
fetch('/api/dev/protected', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('devToken')}`
  }
})
.then(res => res.json())
.then(data => console.log(data));

Note: Remember to:
1. Change the JWT_SECRET and DEV_PASSWORD values
2. Add 'jsonwebtoken' to your package.json dependencies
3. This is a basic setup - only use for development/testing!
*/


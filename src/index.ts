import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';
import { recentLearnings } from './data/learnings';

const app = express();
const port = process.env.PORT || 8080;

// Middleware setup - move these to the top
const isDevelopment = process.env.NODE_ENV !== 'production';
app.use(cors({
    origin: isDevelopment ? 'http://localhost:3000' : 'https://northkevin.com',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // This is crucial for parsing JSON request bodies

// Secret key and password setup
const JWT_SECRET = process.env.JWT_SECRET || 'northkevin-jwt-secret-key-2024-03-17';
const DEV_PASSWORD = process.env.DEV_PASSWORD || 'passworm';

// Warning logs for missing env vars
if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET environment variable not set. Using fallback secret.');
}
if (!process.env.DEV_PASSWORD) {
    console.warn('Warning: DEV_PASSWORD environment variable not set. Using fallback password.');
}

// Authentication middleware
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

// Routes
app.get('/api/hello', (_req: Request, res: Response) => {
    res.json({ message: 'Hello!' });
});


// Dev authentication routes
const loginHandler: RequestHandler = (req, res) => {
    console.log('Login endpoint hit');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    const { password } = req.body;

    if (!password) {
        console.log('No password provided');
        res.status(400).json({ message: 'Password is required' });
    }

    if (password === DEV_PASSWORD) {
        console.log('Login successful');
        const token = jwt.sign({ role: 'dev' }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    }

    console.log('Invalid password attempt');
    res.status(401).json({ message: 'Invalid password' });
};

app.post('/api/dev/login', loginHandler);

app.get('/api/dev/protected', authenticateToken, (req: Request, res: Response) => {
    res.json({ message: 'You have access to dev endpoints!' });
});

// Add a specific OPTIONS handler for the login endpoint
app.options('/api/dev/login', cors());

// In-memory storage for now (would typically be in a database)
// Import learnings from separate file


// GET endpoint to retrieve learnings
app.get('/api/learnings', (_req: Request, res: Response) => {
    res.json(recentLearnings);
});

// POST endpoint to add a new learning
const addLearningHandler = (req: Request, res: Response) => {
    const { content, date, links } = req.body;

    if (!content || !date) {
        res.status(400).json({ message: 'Content and date are required' });
    }
    else {
        console.log('Adding learning:', req.body);
        const newLearning = {
            id: recentLearnings.length > 0 ? Math.max(...recentLearnings.map(l => l.id)) + 1 : 1,
            date,
            content,
            links: links || []
        };

        recentLearnings.unshift(newLearning);
        res.status(201).json(newLearning);
    }
};

app.post('/api/learnings', authenticateToken, addLearningHandler);

// Add HTTPS redirect middleware
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
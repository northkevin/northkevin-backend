import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import learningRoutes from './routes/learningRoutes';
import config from './config/env';
import type { RequestHandler, Request, Response } from 'express';

const app = express();
const port = config.port;

// Middleware setup
const isDevelopment = process.env.NODE_ENV !== 'production';
app.use(cors({
    origin: config.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Secret key and password setup
const JWT_SECRET = config.jwtSecret;
const DEV_PASSWORD = config.devPassword;

// Warning logs for missing env vars
if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET environment variable not set. Using fallback secret.');
}
if (!process.env.DEV_PASSWORD) {
    console.warn('Warning: DEV_PASSWORD environment variable not set. Using fallback password.');
}
if (!process.env.CORS_ORIGINS) {
    console.warn('Warning: CORS_ORIGINS environment variable not set. Using default origins.');
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

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

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

// Mount learning routes
app.use('/api', learningRoutes);

// Add HTTPS redirect middleware
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && !req.secure) {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
});

// After all routes are registered
console.log('Registered routes:');
app._router.stack.forEach((r: any) => {
    if (r.route && r.route.path) {
        console.log(`${Object.keys(r.route.methods)} ${r.route.path}`);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log('Required environment variables:', {
        JWT_SECRET: JWT_SECRET ? '✓ Set' : '✗ Missing',
        DEV_PASSWORD: DEV_PASSWORD ? '✓ Set' : '✗ Missing',
        PORT: port,
        NODE_ENV: config.nodeEnv
    });
});
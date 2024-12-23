import express from 'express';
import cors from 'cors';
import config from './config/env';
import { requestLogger } from './middleware/logging';
import { httpsRedirect } from './middleware/security';
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';
import learningRoutes from './routes/learningRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const port = config.port;

// Middleware setup
app.use(cors({
    origin: config.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(requestLogger);

// Warning logs for missing env vars
if (!config.jwtSecret) {
    console.warn('Warning: JWT_SECRET environment variable not set. Using fallback secret.');
}
if (!config.devPassword) {
    console.warn('Warning: DEV_PASSWORD environment variable not set. Using fallback password.');
}
if (!config.corsOrigins) {
    console.warn('Warning: CORS_ORIGINS environment variable not set. Using default origins.');
}

// Routes
app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello!' });
});

// Mount route modules
app.use('/api/dev', authRoutes);
app.use('/api', learningRoutes);

// Protected route example
app.get('/api/dev/protected', authenticateToken, (req, res) => {
    res.json({ message: 'You have access to dev endpoints!' });
});

// Security middleware
app.use(httpsRedirect);

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${config.nodeEnv}`);
    console.log('Required environment variables:', {
        JWT_SECRET: config.jwtSecret ? '✓ Set' : '✗ Missing',
        DEV_PASSWORD: config.devPassword ? '✓ Set' : '✗ Missing',
        PORT: port,
        NODE_ENV: config.nodeEnv
    });
});
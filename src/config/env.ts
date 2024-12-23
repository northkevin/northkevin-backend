import dotenv from 'dotenv';

// Load .env files
dotenv.config({ path: '.env.local' }); // Load .env.local first (takes precedence)
dotenv.config(); // Load .env second

interface Config {
    port: number;
    nodeEnv: string;
    jwtSecret: string;
    devPassword: string;
    corsOrigins: string[];
}

function validateEnv(): Config {
    const requiredVars = ['JWT_SECRET', 'DEV_PASSWORD'];
    const missing = requiredVars.filter(key => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    return {
        port: parseInt(process.env.PORT || '8080', 10),
        nodeEnv: process.env.NODE_ENV || 'development',
        jwtSecret: process.env.JWT_SECRET!,
        devPassword: process.env.DEV_PASSWORD!,
        corsOrigins: process.env.CORS_ORIGINS
            ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
            : ['http://localhost:3000']
    };
}

const config = validateEnv();
export default config; 
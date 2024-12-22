interface Config {
    port: number;
    nodeEnv: string;
    jwtSecret: string;
    devPassword: string;
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
        devPassword: process.env.DEV_PASSWORD!
    };
}

const config = validateEnv();
export default config; 
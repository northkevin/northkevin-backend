import { Request, Response, NextFunction } from 'express';

export const httpsRedirect = (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'production' && !req.secure) {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
};
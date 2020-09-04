import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

const rateLimitConfig: rateLimit.Options = {
  windowMs: 5 * 60 * 1000,
  max: 500,
};

export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/graphql' || req.path.match(/^\/auth/)) {
    rateLimit(rateLimitConfig)(req, res, next);
  } else {
    next();
  }
};

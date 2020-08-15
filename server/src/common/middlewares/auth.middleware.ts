import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../env';
import { JWTPayload } from '../typings/JWTPayload';
import { RequestUser } from '../typings/RequestUser';

export const authMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
  const { TOKEN_COOKIE_NAME, TOKEN_PREFIX, JWT_SECRET } = env;
  const token: string | undefined = req.cookies[TOKEN_COOKIE_NAME];

  if (token) {
    try {
      const payload = jwt.verify(token.replace(TOKEN_PREFIX, ''), JWT_SECRET) as JWTPayload;

      const user: RequestUser = {
        id: payload.sub,
      };

      req.user = user;
    } catch {
      req.user = null;
    }
  } else {
    req.user = null;
  }

  next();
};

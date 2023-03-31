import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    try {
      const authorizationHeader = req.headers.authorization as string;
      const token: string = authorizationHeader.split(' ')[1];
      jwt.verify(token, process.env.TOKEN_KEY as string);

      next();
    } catch (err) {
      res.status(401).send(err);
    }
  } else {
    console.error('Missing authorization header');
    res.status(401).send('Missing authorization header');
  }
};

export const verifyAuthUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.id);
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token: string = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_KEY as string
    ) as JwtPayload;
    console.log(decodedToken.id);
    console.log(typeof decodedToken.id);
    console.log(`Decoded token: ${decodedToken.id}, User id ${userId}`);

    if (decodedToken.id !== userId) {
      res.status(401).send('unauthorized user');
    }
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import 'dotenv/config';

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error('Token missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.SECRET);
    console.log(decoded);
    next()
  } catch {
    throw new Error('Invalid Token!');
  }
}
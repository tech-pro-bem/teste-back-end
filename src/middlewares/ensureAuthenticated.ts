import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import 'dotenv/config';
import { container } from "tsyringe";
import { VolunteersRepository } from "../modules/volunteers/repositories/VolunteersRepository";

interface IPayload {
  sub: string;
}

interface IRequestVoluntary {
  id: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error('Token missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, process.env.SECRET) as IPayload;
    const volunteersRepository = container.resolve(VolunteersRepository);
    const user = await volunteersRepository.findById(user_id);

    if (!user) {
      throw new Error('User not Found!');
    }

    request.user = {
      id: user_id
    }

    next()
  } catch {
    throw new Error('Invalid Token!');
  }
}
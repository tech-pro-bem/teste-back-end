import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import 'dotenv/config';
import { container } from "tsyringe";
import { VolunteersRepository } from "../modules/volunteers/repositories/VolunteersRepository";
import { AppError } from "../errors/AppError";
import mongoose, { Mongoose, Schema, SchemaType, SchemaTypes } from "mongoose";

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
      throw new AppError('User not Found!', 403);
    }

    request.user = {
      id: user_id
    }

    next()
  } catch {
    throw new Error('Invalid Token!');
  }
}
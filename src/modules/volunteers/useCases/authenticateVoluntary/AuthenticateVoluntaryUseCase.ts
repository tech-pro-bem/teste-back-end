import { inject, injectable } from "tsyringe";
import { IVolunteersRepository } from "../../interfaces/IVolunteersRepository";
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { IVoluntary } from "../../interfaces/IVoluntary";
import 'dotenv/config';
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: IVoluntary['email'];
  password: IVoluntary['password'];
}

interface IResponse {
  voluntary: {
    name: IVoluntary['name'],
    email: IVoluntary['email']
  },
  token: string;
}

@injectable()
class AuthenticateVoluntaryUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const voluntary = await this.volunteersRepository.findByEmail(email);

    if (!voluntary) {
      throw new AppError('Email or password incorrect!', 403);
    }

    const passwordMatch = await compare(password, voluntary.password);

    if(!passwordMatch) {
      throw new AppError('Email or password incorrect!', 403);
    }
    const token = sign( {}, process.env.SECRET, {
      subject: voluntary._id.toString(),
      expiresIn: '1d',
    });

    const voluntaryReturn: IResponse = {
      voluntary: {
        name: voluntary.name,
        email: voluntary.email
      },
      token
    }

    return voluntaryReturn;

  }
}

export { AuthenticateVoluntaryUseCase };

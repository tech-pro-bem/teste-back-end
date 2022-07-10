import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { FindVoluntaryByEmailUseCase } from "./FindVoluntaryByEmailUSeCase";

class FindVoluntaryByEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    console.log(email)
    const findVoluntaryByEmailUseCase = container.resolve(FindVoluntaryByEmailUseCase);

    try {
      const voluntary = await findVoluntaryByEmailUseCase.execute(email);

      return response.status(200).json(voluntary);
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { FindVoluntaryByEmailController };

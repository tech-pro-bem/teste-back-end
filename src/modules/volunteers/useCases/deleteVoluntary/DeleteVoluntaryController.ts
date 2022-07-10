import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { DeleteVoluntaryUseCase } from "./DeleteVoluntaryUseCase";

class DeleteVoluntaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.query;
    console.log(email)
    const deleteVoluntaryUseCase = container.resolve(DeleteVoluntaryUseCase);

    try {
      await deleteVoluntaryUseCase.execute(email as string);
      return response.status(200).send();
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export { DeleteVoluntaryController };

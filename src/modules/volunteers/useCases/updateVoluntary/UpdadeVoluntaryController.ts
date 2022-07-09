import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateVoluntaryUseCase } from "./UpdateVoluntaryUseCase";

class UpdateVoluntaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateVoluntaryUseCase = container.resolve(UpdateVoluntaryUseCase);

    try {
      await updateVoluntaryUseCase.execute(request.body);
      return response.status(200).send();
    } catch (err) {
      return response.status(404).json({
        error: err.message
      })
    }
  }
}

export { UpdateVoluntaryController }
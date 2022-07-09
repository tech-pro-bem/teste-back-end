import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteVoluntaryUseCase } from "./DeleteVoluntaryUseCase";

class DeleteVoluntaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const deleteVoluntaryUseCase = container.resolve(DeleteVoluntaryUseCase);

    try {
      await deleteVoluntaryUseCase.execute(email);
      return response.status(200).send();
    } catch (err) {
      return response.status(404).json({
        error: err.message
      })
    }
  }
}

export { DeleteVoluntaryController };

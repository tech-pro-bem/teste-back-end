import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateVoluntaryUseCase } from "./CreateVoluntaryUseCase";

class CreateVoluntaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const voluntary = container.resolve(CreateVoluntaryUseCase);

    try {
      await voluntary.execute(request.body);

      return response.status(201).send();
    } catch (err) {
      return response.status(404).json({
        error: err.message
      })
    }
  }
}

export { CreateVoluntaryController }
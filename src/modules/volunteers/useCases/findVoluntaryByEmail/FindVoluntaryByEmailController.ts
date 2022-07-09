import { Request, Response } from "express";
import { container } from "tsyringe";
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
      return response.status(404).json({
        error: err.message
      })
    }
  }
}

export { FindVoluntaryByEmailController };

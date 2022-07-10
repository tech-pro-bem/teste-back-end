import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { AuthenticateVoluntaryUseCase } from "./AuthenticateVoluntaryUseCase";

class AuthenticateVoluntaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateVoluntaryUseCase = container.resolve(AuthenticateVoluntaryUseCase);

    try {
      const voluntary = await authenticateVoluntaryUseCase.execute({ email , password });

      return response.status(200).json(voluntary)
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}
export { AuthenticateVoluntaryController };
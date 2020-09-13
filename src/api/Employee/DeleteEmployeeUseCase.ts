import { Request, Response } from "express";

import BaseUseCase from "../BaseUsecase";
import EmployeeRepository from "../../repository/EmployeeRepository";

class UpdateEmployeeUseCase extends BaseUseCase {
  private employeeRepository: EmployeeRepository;
  constructor(request: Request, response: Response, employeeRepository: EmployeeRepository) {
    super(request, response);
    this.employeeRepository = employeeRepository;
  }

  public async execute(): Promise<any> {
    try {
      const { employeeId } = this.request.query;
      if (!employeeId) throw new Error("employeeId required in query");

      const msg = await this.employeeRepository.remove({ _id: employeeId });
      console.log("msg", msg);

      if (msg !== "Error") {
        return { code: 200, message: msg };
      } else {
        return { code: 400, message: msg };
      }
    } catch (error) {
      throw error;
    }
  }
  static create(request: Request, response: Response) {
    return new UpdateEmployeeUseCase(request, response, new EmployeeRepository());
  }
}
export default UpdateEmployeeUseCase;

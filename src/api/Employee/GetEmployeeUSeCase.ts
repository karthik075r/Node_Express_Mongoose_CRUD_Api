import { Request, Response } from "express";

import BaseUseCase from "../BaseUsecase";
import EmployeeRepository from "../../repository/EmployeeRepository";
class GetEmployeeUseCase extends BaseUseCase {
  private employeeRepository: EmployeeRepository;
  constructor(request: Request, response: Response, employeeRepository: EmployeeRepository) {
    super(request, response);
    this.employeeRepository = employeeRepository;
  }

  public async execute(): Promise<any> {
    try {
      const { employeeId } = this.request.query;
      if (!employeeId) throw new Error("employeeId required in query");
      const employee = await this.employeeRepository.findOne({ _id: employeeId });

      return { code: 200, message: "success", employees: employee };
    } catch (error) {
      throw error;
    }
  }
  static create(request: Request, response: Response) {
    return new GetEmployeeUseCase(request, response, new EmployeeRepository());
  }
}
export default GetEmployeeUseCase;

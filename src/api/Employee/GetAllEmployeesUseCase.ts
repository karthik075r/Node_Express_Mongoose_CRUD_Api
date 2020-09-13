import { Request, Response } from "express";

import BaseUseCase from "../BaseUsecase";
import EmployeeRepository from "../../repository/EmployeeRepository";
class GetAllEmployeesUseCase extends BaseUseCase {
  private employeeRepository: EmployeeRepository;
  constructor(request: Request, response: Response, employeeRepository: EmployeeRepository) {
    super(request, response);
    this.employeeRepository = employeeRepository;
  }

  public async execute(): Promise<any> {
    try {
      const employees = await this.employeeRepository.find();

      return { code: 200, message: "success", employees: employees };
    } catch (error) {
      throw error;
    }
  }
  static create(request: Request, response: Response) {
    return new GetAllEmployeesUseCase(request, response, new EmployeeRepository());
  }
}
export default GetAllEmployeesUseCase;

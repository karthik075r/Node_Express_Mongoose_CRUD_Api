import { Request, Response } from "express";

import BaseUseCase from "../BaseUsecase";
import EmployeeRepository from "../../repository/EmployeeRepository";
import ValidationUtils from "../../core/validationUtils/validationUtils";

class UpdateEmployeeUseCase extends BaseUseCase {
  private employeeRepository: EmployeeRepository;
  private validationUtils: ValidationUtils;
  constructor(
    request: Request,
    response: Response,
    employeeRepository: EmployeeRepository,
    validationUtils: ValidationUtils
  ) {
    super(request, response);
    this.employeeRepository = employeeRepository;
    this.validationUtils = validationUtils;
  }
  public validate() {
    try {
      if (!this.request.body) {
        throw new Error("Invalid request");
      }
      const { name, phoneNumber, address } = this.request.body;

      if (!name || this.validationUtils.isValidText(name) === false) {
        throw new Error("Invalid name");
      }
      if (!phoneNumber || this.validationUtils.isValidNumber(phoneNumber, phoneNumber.length) === false) {
        throw new Error("Invalid phone number");
      }
      if (!address.city) {
        throw new Error("city cannot be empty in address");
      } else if (this.validationUtils.isValidText(address.city) === false) {
        throw new Error("Invalid city name");
      }
    } catch (error) {
      throw error;
    }
  }
  public async execute(): Promise<any> {
    try {
      const { employeeId } = this.request.query;
      if (!employeeId) throw new Error("employeeId required in query");
      const { name, phoneNumber, address } = this.request.body;

      const employee = await this.employeeRepository.findOneAndUpdate(
        { _id: employeeId },
        { phoneNumber: phoneNumber, name: name, address: address }
      );

      return { code: 200, message: "success", employees: employee };
    } catch (error) {
      throw error;
    }
  }
  static create(request: Request, response: Response) {
    return new UpdateEmployeeUseCase(request, response, new EmployeeRepository(), new ValidationUtils());
  }
}
export default UpdateEmployeeUseCase;

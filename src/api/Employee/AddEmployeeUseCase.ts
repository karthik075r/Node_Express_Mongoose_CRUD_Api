import { Request, Response } from "express";

import BaseUseCase from "../BaseUsecase";
import EmployeeRepository from "../../repository/EmployeeRepository";
import ValidationUtils from "../../core/validationUtils/validationUtils";
class AddEmployeeUseCase extends BaseUseCase {
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
      const { name, email, phoneNumber, address } = this.request.body;

      if (!name || this.validationUtils.isValidText(name) === false) {
        throw new Error("Invalid name");
      }
      if (!email || this.validationUtils.isEmailValid(email) === false) {
        throw new Error("Invalid email");
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
      const { name, email, phoneNumber, address } = this.request.body;
      this.validate();
      let employee = await this.employeeRepository.findOne({ email: email });
      if (!employee) {
        employee = await this.employeeRepository.add({
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
        });
      }
      return { code: 200, message: "Employee added successfully", employee: employee };
    } catch (error) {
      throw error;
    }
  }
  static create(request: Request, response: Response) {
    return new AddEmployeeUseCase(request, response, new EmployeeRepository(), new ValidationUtils());
  }
}
export default AddEmployeeUseCase;

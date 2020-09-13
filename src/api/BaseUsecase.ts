import { Request, Response } from "express";
import IUseCaseInterface from "./IUseCaseInterFace";
interface Data {
  code: number;
  message: string;
}

abstract class BaseUseCase implements IUseCaseInterface {
  protected request: Request;
  protected response: Response;
  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  public validate(): any {
    throw new Error("Method not implemented");
  }

  abstract async execute(): Promise<any>;
  public async executeAndHandleErrors() {
    try {
      let data: Data = await this.execute();
      if (data == null) {
        data = { code: 0, message: "" };
      }
      let code = 200;
      data.code = code;
      this.response.status(code).json(data);
    } catch (error) {
      if (error != null) {
        let message = error.message;
        if (error.code == 11000) {
          message = "Duplicate Object";
        }
        let code = error.code ? error.code : 400;
        let data: Data = { code: code, message: message };
        this.response.status(code >= 100 && code < 600 ? code : 500).json(data);
      } else {
        let data = {
          code: 500,
          message: "Unable to process your request, please try again",
        };
        this.response.status(500).json(data);
      }
    }
  }
}
export default BaseUseCase;

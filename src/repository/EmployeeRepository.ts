import BaseRepository from "./BaseRepository";
import * as EmployeeSchema from "../schema/EmployeeSchema";

class EmployeeRepository extends BaseRepository {
  constructor() {
    super();
  }
  public model() {
    return EmployeeSchema.default;
  }
}

export default EmployeeRepository;

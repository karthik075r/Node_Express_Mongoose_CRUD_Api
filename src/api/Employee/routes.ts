import { Router, response } from "express";
import AddEmployeeUseCase from "./AddEmployeeUseCase";
import GetAllEmployeesUSeCase from "./GetAllEmployeesUseCase";
import GetEmployeeUseCase from "./GetEmployeeUSeCase";
import UpdateEmployeeUseCase from "./UpdateEmployeeUseCase";
import DeleteEmployeeUseCase from "./DeleteEmployeeUseCase";

const router = Router();

router.post("/employee", (request, response) => {
  let useCase = AddEmployeeUseCase.create(request, response);
  useCase.executeAndHandleErrors();
});
router.get("/employees", (request, response) => {
  let useCase = GetAllEmployeesUSeCase.create(request, response);
  useCase.executeAndHandleErrors();
});
router.get("/employee", (request, response) => {
  let useCase = GetEmployeeUseCase.create(request, response);
  useCase.executeAndHandleErrors();
});
router.put("/employee", (request, response) => {
  let useCase = UpdateEmployeeUseCase.create(request, response);
  useCase.executeAndHandleErrors();
});

router.delete("/employee", (request, response) => {
  let useCase = DeleteEmployeeUseCase.create(request, response);
  useCase.executeAndHandleErrors();
});
export default router;

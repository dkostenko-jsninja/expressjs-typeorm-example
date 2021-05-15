import { Developer } from "../../../models/developer/entities/developer.entity";
import { DeveloperDTO } from "../../../models/developer/validators/developer.validator";

export const mockDeveloper: Developer = {
  id: 1,
  uuid: "c59dd452-678a-4e17-9a6e-dd945f536327",
  firstName: "Test",
  lastName: "Test",
  email: "test@email.com",
  level: "junior",
  employeeStatus: "active",
  photo: "",
  developerProjects: [],
  features: [],
  createdAt: new Date("2021-02-15 22:50:03.000000"),
  updatedAt: new Date("2021-02-15 22:50:03.000000"),
};

export const mockDeveloperDTO: DeveloperDTO = {
  firstName: "Test",
  lastName: "Test",
  email: "test@email.com",
  level: "junior",
  employeeStatus: "active",
  photo: "",
};

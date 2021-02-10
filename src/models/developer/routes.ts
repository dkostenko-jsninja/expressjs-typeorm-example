import { DeveloperController } from "./developer.controller";
import { DeveloperDTO } from "./validators/developer.validator";

export const DeveloperRoutes = [
  {
    method: "post",
    route: "/developer",
    controller: DeveloperController,
    action: "create",
    validator: DeveloperDTO,
  },
  {
    method: "get",
    route: "/developers",
    controller: DeveloperController,
    action: "getAll",
    validator: null,
  },
  {
    method: "put",
    route: "/developer/:uuid",
    controller: DeveloperController,
    action: "edit",
    validator: DeveloperDTO,
  },
];

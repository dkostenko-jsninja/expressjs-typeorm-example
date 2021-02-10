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
];

import { ProjectController } from "./project.controller";
import { ProjectDTO } from "./validators/project.validator";

export const ProjectRouter = [
  {
    method: "post",
    route: "/project",
    controller: ProjectController,
    action: "create",
    validator: ProjectDTO,
  },
  {
    method: "get",
    route: "/projects",
    controller: ProjectController,
    action: "getAll",
    validator: null,
  },
];

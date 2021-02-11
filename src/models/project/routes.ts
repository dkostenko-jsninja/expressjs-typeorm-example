import { ProjectController } from "./project.controller";
import { ProjectDTO } from "./validators/project.validator";
import { FeatureDTO } from "./validators/feature.validator";

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
  {
    method: "put",
    route: "/project/:uuid",
    controller: ProjectController,
    action: "update",
    validator: ProjectDTO,
  },
  {
    method: "delete",
    route: "/project/:uuid",
    controller: ProjectController,
    action: "delete",
    validator: null,
  },
  {
    method: "post",
    route: "/project/:uuid/feature",
    controller: ProjectController,
    action: "createFeature",
    validator: FeatureDTO,
  },
];

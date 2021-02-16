import { ProjectController } from "./project.controller";
import { ProjectDTO } from "./validators/project.validator";
import { FeatureDTO } from "./validators/feature.validator";
import { AssignDeveloperDTO } from "./validators/assign-developer.validator";

export const ProjectRoutes = [
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
  {
    method: "put",
    route: "/project/:uuid/feature/:featureUuid",
    controller: ProjectController,
    action: "updateFeature",
    validator: FeatureDTO,
  },
  {
    method: "delete",
    route: "/project/:uuid/feature/:featureUuid",
    controller: ProjectController,
    action: "deleteFeature",
    validator: null,
  },
  {
    method: "post",
    route: "/project/:uuid/developers",
    controller: ProjectController,
    action: "assignDeveloper",
    validator: AssignDeveloperDTO,
  },
  {
    method: "delete",
    route: "/project/:uuid/developers/:developerUuid",
    controller: ProjectController,
    action: "unassignDeveloper",
    validator: null,
  },
];

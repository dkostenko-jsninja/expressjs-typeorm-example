import { NextFunction, Request, Response } from "express";

import { ProjectsService } from "./projects.service";

export class ProjectController {
  private projectService = new ProjectsService();

  create(request: Request, response: Response, next: NextFunction) {
    return this.projectService.create(next, request.body);
  }

  getAll(request: Request, response: Response, next: NextFunction) {
    return this.projectService.getAll(next);
  }

  update(request: Request, response: Response, next: NextFunction) {
    return this.projectService.update(next, request.params.uuid, request.body);
  }

  delete(request: Request, response: Response, next: NextFunction) {
    return this.projectService.delete(next, request.params.uuid);
  }

  createFeature(request: Request, response: Response, next: NextFunction) {
    return this.projectService.createFeature(next, request.params.uuid, request.body);
  }

  updateFeature(request: Request, response: Response, next: NextFunction) {
    return this.projectService.updateFeature(
      next,
      request.params.uuid,
      request.body,
      request.params.featureUuid
    );
  }

  deleteFeature(request: Request, response: Response, next: NextFunction) {
    return this.projectService.deleteFeature(next, request.params.uuid, request.params.featureUuid);
  }

  assignDeveloper(request: Request, response: Response, next: NextFunction) {
    return this.projectService.assignDeveloper(next, request.params.uuid, request.body);
  }

  unassignDeveloper(request: Request, response: Response, next: NextFunction) {
    return this.projectService.unassignDeveloper(
      next,
      request.params.uuid,
      request.params.developerUuid
    );
  }
}

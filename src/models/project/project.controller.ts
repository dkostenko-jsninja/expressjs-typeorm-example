import { NextFunction, Request, Response } from "express";

import { ProjectsService } from "./projects.service";

export class ProjectController {
  private projectService = new ProjectsService();

  async create(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.create(next, request.body);
  }

  async getAll(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.getAll(next);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.update(next, request.params.uuid, request.body);
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.delete(next, request.params.uuid);
  }

  async createFeature(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.createFeature(next, request.params.uuid, request.body);
  }

  async updateFeature(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.updateFeature(
      next,
      request.params.uuid,
      request.body,
      request.params.featureUuid
    );
  }

  async deleteFeature(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.deleteFeature(
      next,
      request.params.uuid,
      request.params.featureUuid
    );
  }

  async assignDeveloper(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.assignDeveloper(next, request.params.uuid, request.body);
  }

  async unassignDeveloper(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.unassignDeveloper(
      next,
      request.params.uuid,
      request.params.developerUuid
    );
  }
}
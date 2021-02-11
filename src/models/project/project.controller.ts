import { NextFunction, Request, Response } from "express";

import { ProjectsService } from "./projects.service";

export class ProjectController {
  private projectService = new ProjectsService();

  async create(req: Request, res: Response, next: NextFunction) {
    return await this.projectService.create(next, req.body);
  }

  async getAll(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.getAll(next);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    return await this.projectService.update(next, request.params.uuid, request.body);
  }
}

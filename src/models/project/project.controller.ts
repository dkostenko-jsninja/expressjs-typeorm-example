import { NextFunction, Request, Response } from "express";

import { ProjectsService } from "./projects.service";

export class ProjectController {
  private projectService = new ProjectsService();

  async create(req: Request, res: Response, next: NextFunction) {
    return await this.projectService.create(next, req.body);
  }
}

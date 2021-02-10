import { NextFunction, Request, Response } from "express";

import { DeveloperService } from "./developer.service";

export class DeveloperController {
  private developerService = new DeveloperService();

  async create(request: Request, response: Response, next: NextFunction) {
    return await this.developerService.create(next, request.body);
  }

  async getAll(request: Request, response: Response, next: NextFunction) {
    return await this.developerService.getAll(next);
  }

  async edit(request: Request, response: Response, next: NextFunction) {
    return await this.developerService.edit(next, request.params.uuid, request.body);
  }
}

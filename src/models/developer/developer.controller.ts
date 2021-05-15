import { NextFunction, Request, Response } from "express";

import { DeveloperService } from "./developer.service";

export class DeveloperController {
  private developerService = new DeveloperService();

  create(request: Request, response: Response, next: NextFunction) {
    return this.developerService.create(next, request.body);
  }

  getAll(request: Request, response: Response, next: NextFunction) {
    return this.developerService.getAll(next);
  }

  edit(request: Request, response: Response, next: NextFunction) {
    return this.developerService.edit(next, request.params.uuid, request.body);
  }

  delete(request: Request, response: Response, next: NextFunction) {
    return this.developerService.delete(next, request.params.uuid);
  }
}

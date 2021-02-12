import * as createHttpError from "http-errors";

import { SuccessResponse } from "../../common/types/common-types";

import { ProjectsService } from "../project/projects.service";

import { DeveloperRepository } from "./repositories/developer.repository";
import { Developer } from "./entities/developer.entity";
import { DeveloperDTO } from "./validators/developer.validator";
import { DeveloperSerializer } from "./serializers/developer.serializer";

export class DeveloperService {
  private developerRepository = new DeveloperRepository(Developer);

  private projectService = new ProjectsService();

  async create(next, developer: DeveloperDTO): Promise<{ developer: DeveloperSerializer }> {
    const developerFromDB = await this.developerRepository.get(next, { email: developer.email });
    if (developerFromDB) {
      return next(
        new createHttpError.BadRequest(`Developer with this email address already exists.`)
      );
    }

    const newDeveloper = await this.developerRepository.createEntity(next, developer);

    return { developer: newDeveloper };
  }

  async getAll(next): Promise<{ developers: DeveloperSerializer[] }> {
    const developers = await this.developerRepository.getAll(next);
    return { developers };
  }

  async edit(next, uuid: string, developer: DeveloperDTO): Promise<SuccessResponse> {
    const similarDeveloper = await this.developerRepository.get(next, { email: developer.email });
    if (similarDeveloper && similarDeveloper.uuid !== uuid) {
      return next(
        new createHttpError.BadRequest("Developer with this email address already exists.")
      );
    }

    return await this.developerRepository.updateEntity(next, { uuid }, developer);
  }

  async delete(next, uuid: string): Promise<SuccessResponse> {
    const developer = await this.developerRepository.get(next, { uuid }, ["features"], true, true);
    if (!developer) {
      return;
    }

    await this.projectService.unassignDeveloperFromFeatures(next, developer.features);

    return await this.developerRepository.deleteEntity(next, { uuid });
  }
}

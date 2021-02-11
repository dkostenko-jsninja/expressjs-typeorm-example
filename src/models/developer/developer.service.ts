import * as createHttpError from "http-errors";

import { SuccessResponse } from "../../types/common-types";

import { DeveloperRepository } from "./repositories/developer.repository";
import { Developer } from "./entities/developer.entity";
import { DeveloperDTO } from "./validators/developer.validator";
import { DeveloperSerializer } from "./serializers/developer.serializer";

export class DeveloperService {
  private developerRepository = new DeveloperRepository(Developer);

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
    return await this.developerRepository.updateEntity(next, { uuid }, developer);
  }

  async delete(next, uuid: string): Promise<SuccessResponse> {
    return await this.developerRepository.deleteEntity(next, { uuid });
  }
}

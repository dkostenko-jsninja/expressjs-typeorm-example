import * as createHttpError from "http-errors";

import { DeveloperRepository } from "./repositories/developer.repository";
import { Developer } from "./entities/developer.entity";
import { DeveloperDTO } from "./validators/developer.validator";
import { DeveloperSerializer } from "./serializers/developer.serializer";

export class DeveloperService {
  private developerRepository = new DeveloperRepository(Developer);

  async create(next, entity: DeveloperDTO): Promise<DeveloperSerializer> {
    const developerFromDB = await this.developerRepository.get(next, { email: entity.email });
    if (developerFromDB) {
      return next(
        new createHttpError.BadRequest(`Developer with this email address already exists.`)
      );
    }

    return await this.developerRepository.createEntity(next, entity);
  }
}

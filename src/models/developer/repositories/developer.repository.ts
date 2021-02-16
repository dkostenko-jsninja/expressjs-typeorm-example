import { classToPlain, plainToClass } from "class-transformer";

import { ModelRepository } from "../../model.repository";

import { Developer } from "../entities/developer.entity";
import { DeveloperSerializer } from "../serializers/developer.serializer";

export class DeveloperRepository extends ModelRepository<Developer, DeveloperSerializer> {
  transform(model: Developer): DeveloperSerializer {
    return plainToClass(DeveloperSerializer, classToPlain(model));
  }

  transformMany(models: Developer[]): DeveloperSerializer[] {
    return models.map((model) => this.transform(model));
  }
}

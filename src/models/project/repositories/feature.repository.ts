import { classToPlain, plainToClass } from "class-transformer";

import { ModelRepository } from "../../model.repository";

import { Feature } from "../entities/feature.entity";
import { FeatureSerializer } from "../serializers/feature.serializer";

export class FeatureRepository extends ModelRepository<Feature, FeatureSerializer> {
  transform(model: Feature): FeatureSerializer {
    return plainToClass(FeatureSerializer, classToPlain(model));
  }

  transformMany(models: Feature[]): FeatureSerializer[] {
    return models.map((model) => this.transform(model));
  }
}

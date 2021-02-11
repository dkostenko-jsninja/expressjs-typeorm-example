import { classToPlain, Exclude, plainToClass, Transform } from "class-transformer";

import { Project } from "../entities/project.entity";
import { Feature } from "../entities/feature.entity";

import { FeatureSerializer } from "./feature.serializer";

export class ProjectSerializer implements Project {
  @Exclude()
  id: number;

  uuid: string;

  name: string;

  description: string;

  expirationDate: string;

  @Transform((features) => {
    return features.value.map((feature) => plainToClass(FeatureSerializer, classToPlain(feature)));
  })
  features: Feature[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

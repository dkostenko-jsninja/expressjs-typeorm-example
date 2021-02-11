import { Exclude } from "class-transformer";

import { Feature } from "../entities/feature.entity";
import { Project } from "../entities/project.entity";

export class FeatureSerializer implements Feature {
  @Exclude()
  id: number;

  uuid: string;

  name: string;

  description: string;

  @Exclude()
  expirationDate: string;

  @Exclude()
  developerUuid: string;

  @Exclude()
  project: Project;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

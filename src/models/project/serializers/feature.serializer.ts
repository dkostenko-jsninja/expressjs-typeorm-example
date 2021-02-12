import { Exclude } from "class-transformer";

import { Developer } from "../../developer/entities/developer.entity";

import { Feature } from "../entities/feature.entity";
import { Project } from "../entities/project.entity";

export class FeatureSerializer implements Feature {
  @Exclude()
  id: number;

  uuid: string;

  name: string;

  description: string;

  expirationDate: string;

  developerUuid: string;

  @Exclude()
  project: Project;

  @Exclude()
  developer: Developer;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

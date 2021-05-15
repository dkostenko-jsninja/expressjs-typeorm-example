import { Exclude } from "class-transformer";

import { CommonSerializer } from "../../../common/serializers/common.serializer";

import { Developer } from "../../developer/entities/developer.entity";

import { Feature } from "../entities/feature.entity";
import { Project } from "../entities/project.entity";

export class FeatureSerializer extends CommonSerializer implements Feature {
  uuid: string;

  name: string;

  description: string;

  expirationDate: string;

  developerUuid: string;

  @Exclude()
  project: Project;

  @Exclude()
  developer: Developer;
}

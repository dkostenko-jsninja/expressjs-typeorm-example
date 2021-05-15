import { classToPlain, plainToClass, Transform } from "class-transformer";

import { CommonSerializer } from "../../../common/serializers/common.serializer";

import { DeveloperSerializer } from "../../developer/serializers/developer.serializer";

import { Project } from "../entities/project.entity";
import { Feature } from "../entities/feature.entity";
import { DeveloperProject } from "../entities/developer-project.entity";

import { FeatureSerializer } from "./feature.serializer";

export class ProjectSerializer extends CommonSerializer implements Project {
  uuid: string;

  name: string;

  description: string;

  expirationDate: string;

  @Transform((features) =>
    features.value.map((feature) => plainToClass(FeatureSerializer, classToPlain(feature)))
  )
  features: Feature[];

  @Transform((team) =>
    team.value.map((developerProject) =>
      plainToClass(DeveloperSerializer, classToPlain(developerProject.developer))
    )
  )
  team: DeveloperProject[];
}

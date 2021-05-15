import { Exclude } from "class-transformer";

import { CommonSerializer } from "../../../common/serializers/common.serializer";

import { DeveloperProject } from "../../project/entities/developer-project.entity";
import { Feature } from "../../project/entities/feature.entity";

import { Developer } from "../entities/developer.entity";

export class DeveloperSerializer extends CommonSerializer implements Developer {
  uuid: string;

  email: string;

  firstName: string;

  lastName: string;

  photo: string;

  level: string;

  employeeStatus: string;

  @Exclude()
  developerProjects: DeveloperProject[];

  @Exclude()
  features: Feature[];
}

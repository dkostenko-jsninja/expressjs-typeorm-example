import { Exclude } from "class-transformer";

import { Developer } from "../entities/developer.entity";

export class DeveloperSerializer implements Developer {
  @Exclude()
  id: number;

  uuid: string;

  email: string;

  firstName: string;

  lastName: string;

  photo: string;

  level: string;

  employeeStatus: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

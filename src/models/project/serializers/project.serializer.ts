import { Project } from "../entities/project.entity";
import { Exclude } from "class-transformer";

export class ProjectSerializer implements Project {
  @Exclude()
  id: number;

  uuid: string;

  name: string;

  description: string;

  expirationDate: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

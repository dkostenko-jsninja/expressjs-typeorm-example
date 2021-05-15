import { Column, Entity, Generated, OneToMany } from "typeorm";

import { CommonEntity } from "../../../common/entities/common.entity";

import { IProject } from "../interfaces/project.interface";

import { Feature } from "./feature.entity";
import { DeveloperProject } from "./developer-project.entity";

@Entity({ name: "project" })
export class Project extends CommonEntity implements IProject {
  @Column({ unique: true, type: "varchar", length: 36 })
  @Generated("uuid")
  uuid: string;

  @Column()
  name: string;

  @Column({ type: "longtext" })
  description: string;

  @Column()
  expirationDate: string;

  @OneToMany((type) => Feature, (feature) => feature.project)
  features: Feature[];

  @OneToMany((type) => DeveloperProject, (developerProject) => developerProject.project)
  team: DeveloperProject[];
}

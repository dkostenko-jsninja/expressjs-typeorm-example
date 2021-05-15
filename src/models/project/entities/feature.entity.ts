import { Column, Entity, Generated, ManyToOne } from "typeorm";

import { CommonEntity } from "../../../common/entities/common.entity";

import { Developer } from "../../developer/entities/developer.entity";

import { IFeature } from "../interfaces/feature.interface";

import { Project } from "./project.entity";

@Entity({ name: "feature" })
export class Feature extends CommonEntity implements IFeature {
  @Column({ unique: true, type: "varchar", length: 36 })
  @Generated("uuid")
  uuid: string;

  @Column()
  name: string;

  @Column({ type: "longtext" })
  description: string;

  @Column({ nullable: true, default: null })
  expirationDate: string;

  @Column({ type: "varchar", length: 36, nullable: true, default: null })
  developerUuid: string;

  @ManyToOne((type) => Project, (project) => project.features, { onDelete: "CASCADE" })
  project: Project;

  @ManyToOne((type) => Developer, (developer) => developer.features)
  developer: Developer;
}

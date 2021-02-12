import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { IProject } from "../interfaces/project.interface";

import { Feature } from "./feature.entity";
import { DeveloperProject } from "./developer-project.entity";

@Entity({ name: "project" })
export class Project implements IProject {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

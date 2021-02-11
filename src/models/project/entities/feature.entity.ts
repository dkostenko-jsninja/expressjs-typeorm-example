import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { IFeature } from "../interfaces/feature.interface";

import { Project } from "./project.entity";

@Entity({ name: "feature" })
export class Feature implements IFeature {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { IProject } from "../interfaces/project.interface";

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

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

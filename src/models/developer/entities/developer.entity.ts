import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { DeveloperLevels, EmployeeStatus, IDeveloper } from "../interfaces/developer.interface";

@Entity({ name: "developer" })
export class Developer implements IDeveloper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: "varchar", length: 36 })
  @Generated("uuid")
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, default: null, type: "longtext" })
  photo: string;

  @Column({
    type: "enum",
    enum: DeveloperLevels,
    default: DeveloperLevels.JUNIOR,
  })
  level: string;

  @Column({
    type: "enum",
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  employeeStatus: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

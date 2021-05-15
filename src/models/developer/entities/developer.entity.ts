import { Column, Entity, Generated, OneToMany } from "typeorm";

import { CommonEntity } from "../../../common/entities/common.entity";

import { DeveloperProject } from "../../project/entities/developer-project.entity";
import { Feature } from "../../project/entities/feature.entity";

import { DeveloperLevels, EmployeeStatus, IDeveloper } from "../interfaces/developer.interface";

@Entity({ name: "developer" })
export class Developer extends CommonEntity implements IDeveloper {
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

  @OneToMany((type) => DeveloperProject, (developerProject) => developerProject.developer)
  developerProjects: DeveloperProject[];

  @OneToMany((type) => Feature, (feature) => feature.developer)
  features: Feature[];
}

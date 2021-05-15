import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Developer } from "../../developer/entities/developer.entity";

import { Project } from "./project.entity";

@Entity({ name: "developerProject" })
export class DeveloperProject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Developer, (developer) => developer.developerProjects, {
    onDelete: "CASCADE",
  })
  developer: Developer;

  @ManyToOne((type) => Project, (project) => project.team, { onDelete: "CASCADE" })
  project: Project;
}

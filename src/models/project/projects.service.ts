import * as createHttpError from "http-errors";

import { SuccessResponse } from "../../types/common-types";

import { CustomDate } from "../custom-date";

import { ProjectRepository } from "./repositories/project.repository";
import { Project } from "./entities/project.entity";
import { ProjectSerializer } from "./serializers/project.serializer";
import { ProjectDTO } from "./validators/project.validator";

export class ProjectsService {
  private projectRepository = new ProjectRepository(Project);
  private customDate = new CustomDate();

  async create(next, project: ProjectDTO): Promise<{ project: ProjectSerializer }> {
    const projectFromDB = await this.projectRepository.get(next, { name: project.name });
    if (projectFromDB) {
      return next(new createHttpError.BadRequest("Project with this name already exists."));
    }

    if (!project.expirationDate) {
      project.expirationDate = this.customDate.addDays(30);
    }

    const newProject = await this.projectRepository.createEntity(next, project);

    return { project: newProject };
  }

  async getAll(next): Promise<{ projects: ProjectSerializer[] }> {
    const projects = await this.projectRepository.getAll(next);
    return { projects };
  }

  async update(next, uuid: string, project: ProjectDTO): Promise<SuccessResponse> {
    const currentProject = await this.projectRepository.get(next, { uuid }, [], true);
    const similarProject = await this.projectRepository.get(next, { name: project.name });

    if (similarProject && similarProject.uuid !== currentProject.uuid) {
      return next(new createHttpError.BadRequest("Project with this name already exists."));
    }

    return await this.projectRepository.updateEntity(next, { uuid }, project);
  }
}

import * as createHttpError from "http-errors";

import { SuccessResponse } from "../../types/common-types";

import { CustomDate } from "../custom-date";

import { ProjectRepository } from "./repositories/project.repository";
import { Project } from "./entities/project.entity";
import { ProjectSerializer } from "./serializers/project.serializer";
import { ProjectDTO } from "./validators/project.validator";

import { FeatureDTO } from "./validators/feature.validator";
import { FeatureRepository } from "./repositories/feature.repository";
import { Feature } from "./entities/feature.entity";
import { FeatureSerializer } from "./serializers/feature.serializer";

export class ProjectsService {
  private projectRepository = new ProjectRepository(Project);
  private featureRepository = new FeatureRepository(Feature);

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
    const projects = await this.projectRepository.getAll(next, {}, ["features"]);
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

  async delete(next, uuid: string): Promise<SuccessResponse> {
    return await this.projectRepository.deleteEntity(next, { uuid });
  }

  async createFeature(
    next,
    uuid: string,
    feature: FeatureDTO
  ): Promise<{ feature: FeatureSerializer }> {
    const project = await this.projectRepository.get(next, { uuid }, ["features"], true, true);
    if (!project) {
      return;
    }

    if (project.features.find((projectFeature) => projectFeature.name === feature.name)) {
      return next(new createHttpError.BadRequest("Feature with this name already exists."));
    }

    const featureEntity = this.featureRepository.create({ ...feature, project });

    const newFeature = await this.featureRepository.createEntity(next, featureEntity);

    return { feature: newFeature };
  }
}

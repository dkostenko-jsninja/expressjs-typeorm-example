import * as createHttpError from "http-errors";

import { SuccessResponse } from "../../types/common-types";
import { successResponse } from "../../constants/success-response";

import { CustomDate } from "../custom-date";

import { DeveloperRepository } from "../developer/repositories/developer.repository";
import { Developer } from "../developer/entities/developer.entity";
import { DeveloperLevels } from "../developer/interfaces/developer.interface";

import { ProjectRepository } from "./repositories/project.repository";
import { Project } from "./entities/project.entity";
import { ProjectSerializer } from "./serializers/project.serializer";
import { ProjectDTO } from "./validators/project.validator";

import { FeatureDTO } from "./validators/feature.validator";
import { FeatureRepository } from "./repositories/feature.repository";
import { Feature } from "./entities/feature.entity";
import { FeatureSerializer } from "./serializers/feature.serializer";

import { DeveloperProject } from "./entities/developer-project.entity";
import { AssignDeveloperDTO } from "./validators/assign-developer.validator";
import { DeveloperProjectRepository } from "./repositories/developer-project.repository";

export class ProjectsService {
  private projectRepository = new ProjectRepository(Project);
  private featureRepository = new FeatureRepository(Feature);
  private developerRepository = new DeveloperRepository(Developer);
  private developerProjectRepository = new DeveloperProjectRepository(DeveloperProject);

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
    const projects = await this.projectRepository.getAll(next, {}, [
      "features",
      "team",
      "team.developer",
    ]);
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

  async updateFeature(
    next,
    uuid: string,
    feature: FeatureDTO,
    featureUuid: string
  ): Promise<SuccessResponse> {
    const project = await this.projectRepository.get(next, { uuid }, ["features"], true);
    if (!project) {
      return;
    }

    if (!project.features.find((projectFeature) => projectFeature.uuid === featureUuid)) {
      return next(new createHttpError.NotFound("Feature was not found."));
    }

    const availableFeature = project.features.find((projectFeature) => {
      return projectFeature.name === feature.name && projectFeature.uuid !== featureUuid;
    });
    if (availableFeature) {
      return next(new createHttpError.BadRequest("Feature with this name already exists."));
    }

    return await this.featureRepository.updateEntity(next, { uuid: featureUuid }, feature);
  }

  async deleteFeature(next, uuid: string, featureUuid: string): Promise<SuccessResponse> {
    const project = await this.projectRepository.get(next, { uuid }, [], true);
    if (!project) {
      return;
    }

    return await this.featureRepository.deleteEntity(next, { uuid: featureUuid });
  }

  async assignDeveloper(
    next,
    uuid: string,
    assignDeveloper: AssignDeveloperDTO
  ): Promise<SuccessResponse> {
    const project = await this.projectRepository.get(next, { uuid }, [], true, true);
    const developer = await this.developerRepository.get(
      next,
      { uuid: assignDeveloper.developerUuid },
      ["developerProjects", "developerProjects.project"],
      true,
      true
    );

    if (!project || !developer) {
      return;
    }

    const developerProjectsAmount = developer.developerProjects.length;
    const isAlreadyAssigned =
      developer.developerProjects.findIndex((developerProject) => {
        return developerProject.project.uuid === project.uuid;
      }) !== -1;

    if (
      (developer.level === DeveloperLevels.SENIOR && developerProjectsAmount >= 2) ||
      (developer.level === DeveloperLevels.JUNIOR && developerProjectsAmount >= 1) ||
      isAlreadyAssigned
    ) {
      const projectNames = developer.developerProjects
        .map((project) => project.project.name)
        .join(" and ");

      return next(
        new createHttpError.BadRequest(`This developer is already assigned to ${projectNames}.`)
      );
    }

    await this.developerProjectRepository.saveEntity(next, { developer, project });

    if (developer.level === DeveloperLevels.SENIOR && developerProjectsAmount >= 1) {
      const developerProjects = developer.developerProjects.map((developerProject) => {
        return developerProject.project;
      });
      developerProjects.push(project);

      for (const developerProject of developerProjects) {
        await this.projectRepository.updateEntity(
          next,
          { uuid: developerProject.uuid },
          { expirationDate: this.customDate.addDays(10) }
        );
      }
    }

    return successResponse;
  }

  async unassignDeveloper(next, uuid: string, developerUuid: string): Promise<SuccessResponse> {
    const project = await this.projectRepository.get(next, { uuid }, [], true, true);
    const developer = await this.developerRepository.get(
      next,
      { uuid: developerUuid },
      [],
      true,
      true
    );

    if (!project || !developer) {
      return;
    }

    await this.developerProjectRepository.deleteEntity(next, { developer, project });

    return successResponse;
  }
}

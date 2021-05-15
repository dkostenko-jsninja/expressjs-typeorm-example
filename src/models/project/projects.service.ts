import * as createHttpError from "http-errors";

import { SuccessResponse } from "../../common/types/common-types";
import { successResponse } from "../../common/constants/success-response";

import { CustomDate } from "../custom-date";

import { Developer } from "../developer/entities/developer.entity";
import { DeveloperLevels } from "../developer/interfaces/developer.interface";
import { DeveloperRepository } from "../developer/repositories/developer.repository";

import { Project } from "./entities/project.entity";
import { ProjectDTO } from "./validators/project.validator";
import { ProjectRepository } from "./repositories/project.repository";
import { ProjectSerializer } from "./serializers/project.serializer";

import { Feature } from "./entities/feature.entity";
import { FeatureDTO } from "./validators/feature.validator";
import { FeatureRepository } from "./repositories/feature.repository";
import { FeatureSerializer } from "./serializers/feature.serializer";

import { DeveloperProject } from "./entities/developer-project.entity";
import { DeveloperProjectRepository } from "./repositories/developer-project.repository";

import { AssignDeveloperDTO } from "./validators/assign-developer.validator";

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
    const similarProject = await this.projectRepository.get(next, { name: project.name });
    if (similarProject && similarProject.uuid !== uuid) {
      return next(new createHttpError.BadRequest("Project with this name already exists."));
    }

    return this.projectRepository.updateEntity(next, { uuid }, project);
  }

  delete(next, uuid: string): Promise<SuccessResponse> {
    return this.projectRepository.deleteEntity(next, { uuid });
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

    let developer = null;
    if (feature.developerUuid) {
      developer = await this.getDeveloperForFeature(next, feature.developerUuid, uuid, null);
    }

    if (!developer && feature.developerUuid) {
      return;
    }

    const featureEntity = this.featureRepository.create({
      ...feature,
      project,
      developer,
      expirationDate: developer ? this.customDate.currentDate() : null,
    });

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

    const availableFeature = project.features.find(
      (projectFeature) =>
        projectFeature.name === feature.name && projectFeature.uuid !== featureUuid
    );
    if (availableFeature) {
      return next(new createHttpError.BadRequest("Feature with this name already exists."));
    }

    let developer = null;
    if (feature.developerUuid) {
      developer = await this.getDeveloperForFeature(next, feature.developerUuid, uuid, featureUuid);
    }

    if (!developer && feature.developerUuid) {
      return;
    }

    return this.featureRepository.updateEntity(
      next,
      { uuid: featureUuid },
      {
        ...feature,
        developer,
        expirationDate: developer ? this.customDate.currentDate() : null,
      }
    );
  }

  async deleteFeature(next, uuid: string, featureUuid: string): Promise<SuccessResponse> {
    const project = await this.projectRepository.get(next, { uuid }, [], true);
    if (!project) {
      return;
    }

    return this.featureRepository.deleteEntity(next, { uuid: featureUuid });
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
    const assignedProjectIndex = developer.developerProjects.findIndex(
      (developerProject) => developerProject.project.uuid === project.uuid
    );

    if (
      (developer.level === DeveloperLevels.SENIOR && developerProjectsAmount >= 2) ||
      (developer.level === DeveloperLevels.JUNIOR && developerProjectsAmount >= 1) ||
      assignedProjectIndex !== -1
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
      const developerProjects = developer.developerProjects.map(
        (developerProject) => developerProject.project
      );
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
      ["features", "features.project"],
      true,
      true
    );

    if (!project || !developer) {
      return;
    }

    const developersFeatures = developer.features.filter(
      (feature) => feature.project.uuid === project.uuid
    );

    await this.unassignDeveloperFromFeatures(next, developersFeatures);

    return this.developerProjectRepository.deleteEntity(next, { developer, project });
  }

  async unassignDeveloperFromFeatures(next, features: Feature[]): Promise<void> {
    for (const feature of features) {
      let expirationDate = null;
      if (this.customDate.daysBetween(feature.expirationDate, this.customDate.currentDate())) {
        expirationDate = feature.expirationDate;
      }

      await this.featureRepository.updateEntity(
        next,
        { uuid: feature.uuid },
        { developer: null, expirationDate, developerUuid: null }
      );
    }
  }

  private async getDeveloperForFeature(
    next,
    developerUuid: string,
    projectUuid: string,
    featureUuid: string
  ): Promise<Developer> {
    const developer = await this.developerRepository.get(
      next,
      { uuid: developerUuid },
      ["features", "developerProjects", "developerProjects.project"],
      true,
      true
    );

    if (!developer) {
      return;
    }

    const assignedProjectIndex = developer.developerProjects.findIndex(
      (developerProject) => developerProject.project.uuid === projectUuid
    );

    if (assignedProjectIndex === -1) {
      return next(
        new createHttpError.BadRequest(`This developer is not assigned to this project.`)
      );
    }

    const todaysFeatures = developer.features.filter(
      (feature) =>
        this.customDate.daysBetween(feature.expirationDate, this.customDate.currentDate()) === 0 &&
        feature.uuid !== featureUuid
    );

    if (
      (developer.level === DeveloperLevels.SENIOR && todaysFeatures.length <= 1) ||
      (developer.level === DeveloperLevels.JUNIOR && !todaysFeatures.length)
    ) {
      return developer;
    }

    const featureNames = todaysFeatures.map((feature) => feature.name).join(" and ");

    next(
      new createHttpError.BadRequest(
        `This developer already has ${featureNames} in today's task list. You can perform this operation tomorrow.`
      )
    );
  }
}

import { NextFunction } from "express";

import { MockRepository } from "../../common/mocks/database/mock.repository";

import { CustomDate } from "../custom-date";

import { DeveloperRepository } from "../developer/repositories/developer.repository";

import { DeveloperProjectRepository } from "./repositories/developer-project.repository";
import { FeatureRepository } from "./repositories/feature.repository";
import { ProjectRepository } from "./repositories/project.repository";

import { ProjectsService } from "./projects.service";

jest.mock("../developer/repositories/developer.repository", () => ({
  DeveloperRepository: MockRepository,
}));
jest.mock("./repositories/developer-project.repository", () => ({
  DeveloperProjectRepository: MockRepository,
}));
jest.mock("./repositories/feature.repository", () => ({
  FeatureRepository: MockRepository,
}));
jest.mock("./repositories/project.repository", () => ({
  ProjectRepository: MockRepository,
}));

describe("ProjectsService", () => {
  let nextFunc: NextFunction;

  let customDate: CustomDate;

  let projectService: ProjectsService;

  let projectRepository: ProjectRepository;
  let featureRepository: FeatureRepository;
  let developerRepository: DeveloperRepository;
  let developerProjectRepository: DeveloperProjectRepository;

  beforeEach(() => {
    nextFunc = jest.fn();

    projectService = new ProjectsService();

    // provide access to private fields of ProjectService class to test and mock their calls as we don't have dependency injection here
    customDate = projectService["customDate"];
    projectRepository = projectService["projectRepository"];
    featureRepository = projectService["featureRepository"];
    developerRepository = projectService["developerRepository"];
    developerProjectRepository = projectService["developerProjectRepository"];
  });

  describe("create", () => {
    it("should create a new project", async () => {});

    it("should generate project expirationDate if it wasn't provided", async () => {});

    it("should throw BadRequest exception if the project with the same name already exists", async () => {});
  });

  describe("getAll", () => {
    it("should return all projects", async () => {});
  });

  describe("update", () => {
    it("should update project details", async () => {});

    it("should throw BadRequest exception if the project with the same name already exists", async () => {});
  });

  describe("delete", () => {
    it("should delete project", async () => {});
  });

  describe("createFeature", () => {
    it("should create a new feature", async () => {});

    it("should create a new feature and assign developer", async () => {});

    it("should not create feature if the project was not found", async () => {});

    it("should throw BadRequest exception if feature with the same name already exists", async () => {});

    it("should not create feature if developer was not found", async () => {});
  });

  describe("updateFeature", () => {
    it("should update feature", async () => {});

    it("should update feature and assign developer", async () => {});

    it("should not call featureRepository.updateEntity if the project was not found", async () => {});

    it("should throw NotFound exception if feature was not found", async () => {});

    it("should throw BadRequest exception if feature with the same name already exists", async () => {});

    it("should not call featureRepository.updateEntity if developer was not found", async () => {});
  });

  describe("deleteFeature", () => {
    it("should delete feature", async () => {});

    it("should not delete feature if the project was not found", async () => {});
  });

  describe("assignDeveloper", () => {
    it("should assign developer to hte project", async () => {});

    it("should not call developerProjectRepository.saveEntity if developer or project was not found", async () => {});

    it("should throw BadRequest exception if developer is already assigned to another project", async () => {});
  });

  describe("unassignDeveloper", () => {
    it("should unassign developer from the project", async () => {});

    it("should not call unassignDeveloperFromFeatures if project or developer was not found", async () => {});
  });

  describe("unassignDeveloperFromFeatures", () => {
    it("should unassign developer from features", async () => {});
  });

  describe("getDeveloperForFeature", () => {
    it("should return developer for feature", async () => {});

    it("should throw BadRequest exception if developer is not assigned to the project", async () => {});

    it("should throw BadRequest exception if developer already has features in today's task list", async () => {});
  });
});

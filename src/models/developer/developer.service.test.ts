import { NextFunction } from "express";
import * as createHttpError from "http-errors";

import { successResponse } from "../../common/constants/success-response";

import { mockDeveloper, mockDeveloperDTO } from "../../common/mocks/constants/mock-developer";
import { MockRepository } from "../../common/mocks/database/mock.repository";

import { DeveloperService } from "./developer.service";
import { DeveloperRepository } from "./repositories/developer.repository";
import { ProjectsService } from "../project/projects.service";

jest.mock("../project/projects.service.ts");
jest.mock("./repositories/developer.repository.ts", () => ({
  DeveloperRepository: MockRepository,
}));

describe("DeveloperService", () => {
  let nextFunc: NextFunction;
  let developerService: DeveloperService;
  let developerRepository: DeveloperRepository;
  let projectService: ProjectsService;

  beforeEach(() => {
    nextFunc = jest.fn();

    developerService = new DeveloperService();
    // provide access to private fields of DeveloperService class to test and mock their calls as we don't have dependency injection here
    developerRepository = developerService["developerRepository"];
    projectService = developerService["projectService"];
  });

  describe("create", () => {
    it("should create developer", async () => {
      jest.spyOn(developerRepository, "get").mockResolvedValue(null);
      jest.spyOn(developerRepository, "createEntity").mockResolvedValue(mockDeveloper);

      expect(await developerService.create(nextFunc, mockDeveloperDTO)).toStrictEqual({
        developer: mockDeveloper,
      });

      expect(developerRepository.get).toHaveBeenCalledWith(nextFunc, {
        email: mockDeveloperDTO.email,
      });
    });

    it("should throw BadRequest if developer with the same email address exists", async () => {
      jest.spyOn(developerRepository, "get").mockResolvedValue(mockDeveloper);
      jest.spyOn(developerRepository, "createEntity");

      await developerService.create(nextFunc, mockDeveloperDTO);

      expect(nextFunc).toHaveBeenCalledWith(
        new createHttpError.BadRequest("Developer with this email address already exists.")
      );

      expect(developerRepository.createEntity).not.toHaveBeenCalled();
    });
  });

  describe("getAll", () => {
    it("should return all developers", async () => {
      jest.spyOn(developerRepository, "getAll").mockResolvedValue([mockDeveloper]);

      expect(await developerService.getAll(nextFunc)).toStrictEqual({
        developers: [mockDeveloper],
      });

      expect(developerRepository.getAll).toHaveBeenCalledWith(nextFunc);
    });
  });

  describe("edit", () => {
    it("should edit developer's details", async () => {
      jest.spyOn(developerRepository, "get").mockResolvedValue(null);
      jest.spyOn(developerRepository, "updateEntity").mockResolvedValue(successResponse);

      expect(
        await developerService.edit(nextFunc, mockDeveloper.uuid, mockDeveloperDTO)
      ).toStrictEqual(successResponse);

      expect(developerRepository.get).toHaveBeenCalledWith(nextFunc, {
        email: mockDeveloperDTO.email,
      });
      expect(developerRepository.updateEntity).toHaveBeenCalledWith(
        nextFunc,
        { uuid: mockDeveloper.uuid },
        mockDeveloperDTO
      );
    });

    it("should throw BadRequest if developer with the same email address exists", async () => {
      jest.spyOn(developerRepository, "get").mockResolvedValue(mockDeveloper);
      jest.spyOn(developerRepository, "updateEntity");

      await developerService.edit(nextFunc, "", mockDeveloperDTO);

      expect(nextFunc).toHaveBeenCalledWith(
        new createHttpError.BadRequest("Developer with this email address already exists.")
      );

      expect(developerRepository.updateEntity).not.toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should delete developer", async () => {
      jest.spyOn(developerRepository, "get").mockResolvedValue(mockDeveloper);
      jest.spyOn(developerRepository, "deleteEntity").mockResolvedValue(successResponse);

      jest.spyOn(projectService, "unassignDeveloperFromFeatures");

      expect(await developerService.delete(nextFunc, mockDeveloper.uuid)).toBe(successResponse);

      expect(developerRepository.get).toHaveBeenCalledWith(
        nextFunc,
        { uuid: mockDeveloper.uuid },
        ["features"],
        true,
        true
      );
      expect(developerRepository.deleteEntity).toHaveBeenCalledWith(nextFunc, {
        uuid: mockDeveloper.uuid,
      });

      expect(projectService.unassignDeveloperFromFeatures).toHaveBeenCalledWith(
        nextFunc,
        mockDeveloper.features
      );
    });

    it("should not call unassignDeveloperFromFeatures if developer was not found", async () => {
      jest.spyOn(developerRepository, "get").mockResolvedValue(null);
      jest.spyOn(projectService, "unassignDeveloperFromFeatures");

      await developerService.delete(nextFunc, mockDeveloper.uuid);

      expect(projectService.unassignDeveloperFromFeatures).not.toHaveBeenCalled();
    });
  });
});

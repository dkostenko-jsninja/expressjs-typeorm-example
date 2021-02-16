import * as createHttpError from "http-errors";

import { mockDeveloper, mockDeveloperDTO } from "../../common/constants/mocks/mock-developer";
import { successResponse } from "../../common/constants/success-response";

import { DeveloperService } from "./developer.service";
import { DeveloperRepository } from "./repositories/developer.repository";

jest.mock("./repositories/developer.repository.ts");
jest.mock("../project/projects.service.ts");

describe("DeveloperService", () => {
  describe("create", () => {
    it("should create developer", async () => {
      (<any>DeveloperRepository).mockImplementation(() => ({
        get: jest.fn().mockResolvedValue(null),
        createEntity: jest.fn().mockResolvedValue(mockDeveloper),
      }));

      const developerService = new DeveloperService();

      expect(await developerService.create(jest.fn(), mockDeveloperDTO)).toStrictEqual({
        developer: mockDeveloper,
      });
    });

    it("should throw BadRequest if developer with the same email address exists", async () => {
      (<any>DeveloperRepository).mockImplementation(() => ({
        get: jest.fn().mockResolvedValue(mockDeveloper),
      }));

      const developerService = new DeveloperService();

      const next = jest.fn();
      await developerService.create(next, mockDeveloperDTO);

      expect(next).toHaveBeenCalledWith(
        new createHttpError.BadRequest("Developer with this email address already exists.")
      );
    });
  });

  describe("getAll", () => {
    it("should return all developers", async () => {
      (<any>DeveloperRepository).mockImplementation(() => ({
        getAll: jest.fn().mockResolvedValue([mockDeveloper]),
      }));

      const developerService = new DeveloperService();

      expect(await developerService.getAll(jest.fn())).toStrictEqual({
        developers: [mockDeveloper],
      });
    });
  });

  describe("edit", () => {
    it("should edit developer's details", async () => {
      (<any>DeveloperRepository).mockImplementation(() => ({
        get: jest.fn().mockResolvedValue(null),
        updateEntity: jest.fn().mockResolvedValue(successResponse),
      }));

      const developerService = new DeveloperService();

      expect(
        await developerService.edit(jest.fn(), mockDeveloper.uuid, mockDeveloperDTO)
      ).toStrictEqual(successResponse);
    });

    it("should throw BadRequest if developer with the same email address exists", async () => {
      (<any>DeveloperRepository).mockImplementation(() => ({
        get: jest.fn().mockResolvedValue(mockDeveloper),
      }));

      const developerService = new DeveloperService();

      const next = jest.fn();
      await developerService.edit(next, "", mockDeveloperDTO);

      expect(next).toHaveBeenCalledWith(
        new createHttpError.BadRequest("Developer with this email address already exists.")
      );
    });
  });

  describe("delete", () => {
    it("should delete developer", async () => {
      (<any>DeveloperRepository).mockImplementation(() => ({
        get: jest.fn().mockResolvedValue([mockDeveloper]),
        deleteEntity: jest.fn().mockResolvedValue(successResponse),
      }));

      const developerService = new DeveloperService();

      expect(await developerService.delete(jest.fn(), "")).toBe(successResponse);
    });
  });
});

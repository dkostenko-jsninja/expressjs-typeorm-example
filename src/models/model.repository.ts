import { DeepPartial, getRepository, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { plainToClass } from "class-transformer";
import * as createHttpError from "http-errors";

import { successResponse } from "../constants/success-response";
import { SuccessResponse } from "../types/common-types";

import { ModelSerializer } from "./model.serializer";

export class ModelRepository<T, K extends ModelSerializer> {
  private readonly repository: Repository<T>;
  private readonly modelName: string;

  constructor(model) {
    this.modelName = model.name;
    this.repository = getRepository(model);
  }

  async get(
    next,
    findOptions: { [key: string]: any },
    relations: string[] = [],
    throwsException = false,
    withoutTransform = false
  ): Promise<K | T> {
    return await this.repository
      .findOne({ where: findOptions, relations })
      .then((entity) => {
        if (!entity && throwsException) {
          return next(new createHttpError.NotFound(`${this.modelName} was not found.`));
        }

        if (withoutTransform) {
          return entity;
        }

        return entity ? this.transform(entity) : null;
      })
      .catch(next);
  }

  async getAll(
    next,
    findOptions: { [key: string]: any } = {},
    relations: string[] = []
  ): Promise<K[]> {
    return await this.repository
      .find({ where: findOptions, relations })
      .then((entities) => {
        return this.transformMany(entities);
      })
      .catch(next);
  }

  async createEntity(next, entity: DeepPartial<T>): Promise<K | T> {
    return this.repository
      .save(entity)
      .then(async (entity: any) => await this.get(next, { id: entity.id }))
      .catch(next);
  }

  async updateEntity(
    next,
    options: { [key: string]: any },
    inputs: QueryDeepPartialEntity<T>
  ): Promise<SuccessResponse> {
    const entity = await this.get(next, options, [], true, true);

    return this.repository
      .update(this.repository.getId(<T>entity), inputs)
      .then(() => successResponse)
      .catch(next);
  }

  async deleteEntity(next, options: { [key: string]: any }): Promise<SuccessResponse> {
    const entity = await this.get(next, options, [], true, true);

    return this.repository
      .delete(this.repository.getId(<T>entity))
      .then(() => successResponse)
      .catch(next);
  }

  transform(model: T): K {
    return plainToClass(ModelSerializer, model) as K;
  }

  transformMany(models: T[]): K[] {
    return models.map((model) => this.transform(model));
  }
}

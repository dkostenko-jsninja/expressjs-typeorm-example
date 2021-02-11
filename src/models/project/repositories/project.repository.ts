import { classToPlain, plainToClass } from "class-transformer";

import { ModelRepository } from "../../model.repository";

import { Project } from "../entities/project.entity";
import { ProjectSerializer } from "../serializers/project.serializer";

export class ProjectRepository extends ModelRepository<Project, ProjectSerializer> {
  transform(model: Project): ProjectSerializer {
    return plainToClass(ProjectSerializer, classToPlain(model));
  }

  transformMany(models: Project[]): ProjectSerializer[] {
    return models.map((model) => this.transform(model));
  }
}

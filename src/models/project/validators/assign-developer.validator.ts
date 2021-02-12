import { IsUUID } from "class-validator";

export class AssignDeveloperDTO {
  constructor(data) {
    Object.assign(this, data);
  }

  @IsUUID()
  developerUuid: string;
}

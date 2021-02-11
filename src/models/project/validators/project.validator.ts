import { IsDateString, IsOptional, IsString } from "class-validator";

export class ProjectDTO {
  constructor(data) {
    Object.assign(this, data["project"]);
  }

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  expirationDate: string;
}

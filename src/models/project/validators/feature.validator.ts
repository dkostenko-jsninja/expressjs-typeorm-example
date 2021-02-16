import { IsOptional, IsString, IsUUID } from "class-validator";

export class FeatureDTO {
  constructor(data) {
    Object.assign(this, data["feature"]);
  }

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUUID()
  developerUuid: string;
}

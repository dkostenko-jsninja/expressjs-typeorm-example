import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

import { DeveloperLevels, EmployeeStatus } from "../interfaces/developer.interface";

export class DeveloperDTO {
  constructor(data) {
    Object.assign(this, data["developer"]);
  }

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  @Matches(new RegExp(DeveloperLevels.JUNIOR + "|" + DeveloperLevels.SENIOR))
  level: string;

  @IsOptional()
  @IsString()
  @Matches(new RegExp(EmployeeStatus.ACTIVE + "|" + EmployeeStatus.INACTIVE))
  employeeStatus: string;
}

import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Matches } from "class-validator";

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
  @IsUrl()
  photo: string;

  @IsOptional()
  @IsString()
  @Matches(new RegExp(`^(${DeveloperLevels.JUNIOR}|${DeveloperLevels.SENIOR})$`), {
    message: `level must be \"${DeveloperLevels.JUNIOR}\" or \"${DeveloperLevels.SENIOR}\"`,
  })
  level: string;

  @IsOptional()
  @IsString()
  @Matches(new RegExp(`^(${EmployeeStatus.ACTIVE}|${EmployeeStatus.INACTIVE})$`), {
    message: `employeeStatus must be \"${EmployeeStatus.ACTIVE}\" or \"${EmployeeStatus.INACTIVE}\"`,
  })
  employeeStatus: string;
}

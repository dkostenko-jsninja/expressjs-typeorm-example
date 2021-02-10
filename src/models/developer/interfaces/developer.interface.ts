export interface IDeveloper {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  level: string;
  photo: string;
  employeeStatus: string;
}

export enum DeveloperLevels {
  JUNIOR = "junior",
  SENIOR = "senior",
}

export enum EmployeeStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

import { DeveloperRoutes } from "./models/developer/routes";
import { ProjectRouter } from "./models/project/routes";

export const Routes = [...DeveloperRoutes, ...ProjectRouter];

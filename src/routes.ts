import { DeveloperRoutes } from "./models/developer/routes";
import { ProjectRoutes } from "./models/project/routes";

export const Routes = [...DeveloperRoutes, ...ProjectRoutes];

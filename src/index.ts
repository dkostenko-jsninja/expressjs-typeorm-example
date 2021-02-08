import "reflect-metadata";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";

dotenv.config();

import mysqlConfig from "./config/database/mysql/config";
import appConfig from "./config/app/config";

createConnection(mysqlConfig)
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    app.listen(appConfig.port);

    console.log(`Express server has started on port ${appConfig.port}.`);
  })
  .catch((error) => console.log(error));

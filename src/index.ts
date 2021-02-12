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

import { validateBody, validationError } from "./validate";

createConnection(mysqlConfig)
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      const args = [
        "/api" + route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](req, res, next);
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined ? res.send(result) : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        },
      ];

      if (route.validator) {
        args.splice(1, 0, validateBody(route.validator));
      }

      (app as any)[route.method](...args);
    });

    app.use(validationError);

    app.use((error, req, res, next) => {
      const errorStatus = error.status || 500;

      if (errorStatus === 500) {
        console.error(error);
      }

      res.status(errorStatus);
      res.json({
        status: errorStatus,
        message: errorStatus === 500 ? "Internal server error" : error.message,
      });
    });

    app.listen(appConfig.port);

    console.log(`Express server has started on port ${appConfig.port}.`);
  })
  .catch((error) => console.log(error));

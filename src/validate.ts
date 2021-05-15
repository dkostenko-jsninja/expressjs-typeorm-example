import * as express from "express";
import { validate, ValidationError } from "class-validator";

const validationOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  disableErrorMessages: false,
  transform: false,
};

export function validateBody(Type): express.RequestHandler {
  return async (req, res, next) => {
    const input = new Type(req.body);

    const errors = await validate(input, validationOptions);
    if (errors.length > 0) {
      next(errors);
    } else {
      req.body = input;
      next();
    }
  };
}

export function validationError(errors: Error, req, res, next) {
  if (errors instanceof Array && errors[0] instanceof ValidationError) {
    const validationErrors = errors
      .map((err) => Object.keys(err.constraints).map((key) => err.constraints[key]))
      .reduce((accumulator, currentValue) => accumulator.concat(currentValue));

    const errorResponse = {
      statusCode: 400,
      messages: validationErrors,
      error: "Bad Request",
    };

    res.status(400).json(errorResponse).end();
  } else {
    next(errors);
  }
}

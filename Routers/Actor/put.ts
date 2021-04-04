import { Request, Response, NextFunction } from "express";

// Method for put
const putMethod = (request: Request, response: Response) => {
    response.send("put Actor");
}

module.exports = putMethod;
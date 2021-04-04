import { Request, Response, NextFunction } from "express";

// Method for get
const get = (request: Request, response: Response) => {
    response.send("get Actor");
}

module.exports = get;
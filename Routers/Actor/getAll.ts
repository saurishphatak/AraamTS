import { Request, Response, NextFunction } from "express";

// Method for getAll
const getAll = (request: Request, response: Response) => {
    response.send("getAll Actor");
}

module.exports = getAll;
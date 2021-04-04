import { Request, Response, NextFunction } from "express";

// Method for delete
const deleteMethod = (request: Request, response: Response) => {
    response.send("delete Actor");
}

module.exports = deleteMethod;
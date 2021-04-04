import { Request, Response, NextFunction } from "express";

// Method for post
const post = (request: Request, response: Response) => {
    response.send("post Actor");
}

module.exports = post;
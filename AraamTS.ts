const express = require("express");
import { Request, Response } from "express";
import { IAppConfig } from "./Interfaces/IAppConfig";
import { IRouterConfig } from "./Interfaces/IRouterConfig";
import { Logger } from "../TSDebug/Logger";
const path = require("path");

@Logger.log
export class AraamTS {
    // Main express App
    public app;

    // HTTP Verb Type - Creator Map
    private httpVerbTypeMap: Map<string, (router: any, url: string, method: (request: Request, response: Response) => void) => void>;

    // Constructor
    public constructor(
        private appConfig: IAppConfig
    ) {
        this.httpVerbTypeMap = new Map<string, (router: any, url: string, method: (request: Request, response: Response) => void) => void>();
        this.httpVerbTypeMap.set("GET", this.GETVerbAdder.bind(this));
        this.httpVerbTypeMap.set("POST", this.POSTVerbAdder.bind(this));

        // Populate the errorMap
        this.populateErrorAndWarningMap();

        // Create a new app
        this.app = express();
    }

    // Loads the app with routers
    @Logger.call()
    public run() {
        // Add routers to the app
        this.addRouters();

        // If the port is not specified specified
        if (this.appConfig.port < 0) {
            const defaultPort: number = 3000;
            this.app.listen(defaultPort,
                () => {
                    Logger.warn(`${this.errorMap.get("port")}${defaultPort}`);
                    Logger.info(`App ${this.appConfig.appName.length ? this.appConfig.appName : this.errorMap.get("appName")} started on port : ${defaultPort}...`, []);
                }
            );

        }

        else {
            // Start the app on the port
            this.app.listen(this.appConfig.port,
                () => {
                    Logger.info(`App ${this.appConfig.appName.length ? this.appConfig.appName : this.errorMap.get("appName")} started on port : ${this.appConfig.port}...`, []);
                }
            );
        }

        // Return the app so that the user can add do what he wants to do with it
        return this.app;
    }

    // Adds routers to the app
    @Logger.call()
    private addRouters() {
        // For each router config
        this.appConfig.routers.forEach(routerConfig => {
            // Create a new router
            let expressRouter = express.Router();

            // Add routes to the router
            this.addRoutes(expressRouter, routerConfig);

            // Mount the router onto the main app if the mountpoint exists
            // else create a default mountpoint and mount the router
            if (routerConfig.mountPoint.length)
                this.app.use(routerConfig.mountPoint, expressRouter);

            else {
                // Check if defaultMountPoint can be generated from routerName
                if (routerConfig.routerName.length > 0) {
                    const defaultMountPoint: string = `/${routerConfig.routerName.toLowerCase()}`;
                    Logger.warn(`${this.errorMap.get("mountPoint")} ${defaultMountPoint}`);
                    this.app.use(defaultMountPoint, expressRouter);
                }

                else
                    // Else skip mounting this router
                    Logger.warn(this.errorMap.get("routerNameAndMountPoint"));
            }
        });
    }

    // Adds routes to the router
    @Logger.call()
    private addRoutes(expressRouter: any, routerConfig: IRouterConfig) {
        // Add routes to the newRouter
        routerConfig.routes.forEach(route => {

            // If the methodModule is not an empty string
            if (route.methodModule.length) {
                // Import the methodModule
                const method: (request: Request, response: Response) => void = require(path.resolve(route.methodModule));

                // Get the routerAdder method
                const creator: (router: any, url: string, method: (request: Request, response: Response) => void) => void = this.httpVerbTypeMap.get(route.type);

                // If the creator function exists
                creator ? creator(expressRouter, route.url, method) : Logger.warn(`${this.errorMap.get("verbAdder")}${JSON.stringify(route)}`);
            }

            else
                Logger.warn(`${route.url} ${this.errorMap.get("methodModule")}`);

        });
    }

    // Adds a GET Route
    @Logger.call()
    private GETVerbAdder(expressRouter: any, url: string, method: (request: Request, response: Response) => void) {
        if (url.length) {
            // Add the method as a route to the router
            expressRouter.get(url, method);
            return;
        }

        else
            Logger.warn(this.errorMap.get("url"));
    }

    // Adds a POST Route
    @Logger.call()
    private POSTVerbAdder(expressRouter: any, url: string, method: (request: Request, response: Response) => void) {
        if (url.length) {
            expressRouter.post(url, method);
            return
        }

        else
            Logger.warn("url");
    }

    // Error Map
    private errorMap: Map<string, string> = new Map<string, string>();

    private populateErrorAndWarningMap() {
        this.errorMap.set("type", `HTTP Verb Type not specified. Skipping this route!`);
        this.errorMap.set("url", `Route url not specified. Skipping this route!`);
        this.errorMap.set("methodModule", `callback method path not specified. Skipping this route!`);
        this.errorMap.set("routerName", `Router name not specified`);
        this.errorMap.set("mountPoint", `Router mountPoint not specified. Generating default mountPoint : `);
        this.errorMap.set("port", `Port number not specified. Using default port : `);
        this.errorMap.set("routerNameAndMountPoint", `No mountPoint or routerName found.Cannot mount this router.Skipping it!`);
        this.errorMap.set("verbAdder", `verbAdder method not found. Skipping this route : `);
        this.errorMap.set("appName", "app");
    }
}
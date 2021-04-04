import { IRouteConfig } from "./IRouteConfig";

export interface IRouterConfig {
    // Router name
    routerName: string;

    // Mountpoint of the router
    mountPoint: string;

    // Routes
    routes: IRouteConfig[];
}
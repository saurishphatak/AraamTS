import { IRouterConfig } from "./IRouterConfig";

export interface IAppConfig {
    appName: string;
    port: number;
    routers: IRouterConfig[];
}
import { AraamTS } from "./AraamTS";
import { IAppConfig } from "./Interfaces/IAppConfig";
const path = require('path');

const appConfig: IAppConfig = require("./Routers/appConfig.json");

// Create a new Instance of AraamMain
const araamTS: AraamTS = new AraamTS(appConfig);

// Now run the app
const app = araamTS.run();

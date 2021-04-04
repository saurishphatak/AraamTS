# Araam TS

<u><b>Araam</b> is the Hindi Language translation of <b>Rest</b></u>.<br>

Hence, AraamTS is a parody of REST API (TS as it's written in TypeScript).

AraamTS generates ExpressJS routers and its middleware ENTIRELY by reading a JSON configuration file. 

The benefit of using this approach is that *<b>new routers</b>* or even <b>*new routes*</b> can be added to the existing ExpressJS router without disturbing/modifying existing code.

A good understanding of the [App Configuration File](#app-configuration-file) will help in utilizing AraamTS to its potential.

<br><br>
## [App Configuration File](#app-configuration-file)

The *<b>ENTIRE</b>* AraamTS app is controlled by a JSON Configuration File called `appConfig.json`.

- The `appConfig.json` in `/Routers` directory has the following structure : 

    - `appName` : Represents the ExpressJS web server.

    - `port` : Specifies the port to which the ExpressJS webserver will listen.

    - `routers` : Array of `Router Objects`.

        - `Router Object` : Represents all the information required to setup a Router. It has the following structure : 

            - `routerName` : Specifies the Router Name

            - `mountPoint` : Specifies the router mountpoint. <b>If not specified, AraamTS automatically generates it from the `routerName`.</b>

            - `routes` : Array of `Route Objects`. 

                - `Route Object` : It has the following structure : 

                    - `type` : Represents the HTTP Verb type.

                    - `url` : Specifies the url for the incoming requests.

                    - `methodModule` : Represents the `path` of the file that contains the callback method for this route.


## [Quick Start](#quick-start)

- ### <u>Run the Web Server</u> : 
    - In `Main.ts`, import `appConfig.json` and `AraamTS.ts`.

    - Create a new instance of `AraamTS` class.

    - Invoke the `run()` method of the instance.

        <b>NOTE : `run()` returns the ACTUAL ExpressJS app. You can use it further to your convenience.</b> 

    - Run `Main.ts` using ```nodemon --exec 'ts-node' Main.ts```

- ### <u>Create a new Router</u> : 

    - Create a directory with the desired router name in `/Routers` directory. 

    - Create SEPARATE files such that each contains a CRUD method that will be  used as a callback for the router's route. 
    
        <b>NOTE : Export the method using `module.exports`.</b>

    - Add a <b>new</b> `Router Object` (see [App Configuration File](#app-configuration-file)) in `/Routers/appConfig.json`.

- ### <u>Add a new Route to the Router</u> : 

    - Create a new file in the required Router's directory. For example : `/Routers/Actor`.

    - Export the method using `module.exports`.

    - Add a <b>new</b> `Route Object` (see [App Configuration File](#app-configuration-file)) in `/Routers/appConfig.json`.












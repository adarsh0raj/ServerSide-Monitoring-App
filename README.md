# Instructions to run MonApp

1. Setup postgresql, load db_proj.ddl into a database, and edit the corresponding (user, password etc details in the backend/controller.js file)
2. Setup InfluxDB, create a token, organisation, bucket etc and fill in the details in the backend/controller_influx.js file.
3. Run `node backend/index.js` to start up the backend.
4. Goto the frontend directory and run `npm install` followed by `npm start` to start up the app itself.
5. Now using the config file `telegraf.conf`(update the ip address, organisation, bucket name, token of the controller's influxDB etc), send data to controller from the host machines. (They should have telegrad pre installed, run telegraf using the command `telegraf --config <path_to_config_file>`)
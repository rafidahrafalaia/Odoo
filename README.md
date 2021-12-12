## ER Diagram
![alt text](https://github.com/rafidahrafalaia/Odoo/blob/master/images/ERDDiagram1.jpg?raw=true)

## Getting Started
### Creating Database using sequilize migrate

create following folders
- config, contains config file, which tells CLI how to connect with database
- models, contains all models for your project
- migrations, contains all migration files

Set the configuration database in config file inside config/config.json, and table set up each in model and migration, then run:
```
npx sequelize-cli db:migrate
```
### Set Loaders
Folder loaders contain everything that will automatically run first when server is running, it contains:
- Express, for build express server. Here are the setup:
```
	app.enable('trust proxy');
	app.disable('etag').disable('x-powered-by');
 
	// PREVENT ATTACKS TO EXPRESS
	app.use(helmet());
 
	// CORS MIDDLEWARE
	app.use(cors());
 
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(hpp());

	app.use('/',routes());
 
	// catch 404 and forward to error handler
	app.use((req, res, next) => {
	   const err = new Error('Not Found');
	   err['status'] = 404;
	   next(err);
	});
 
	app.use((err, req, res, next) => {
	   res.status(err.status || 500);
	   res.json({
		  errors: [
			 {
				message: err.message
			 }
		  ]
	   });
	});
  ```
- Logger, using Winston to help developers create and manage log events, which can increase overall efficiency and functionality
```
const winston = require('winston');
const config = require('../config');

const transports = [];
   transports.push(
      new winston.transports.Console({
         format: winston.format.combine(winston.format.cli(), winston.format.splat())
      })
   );


const LoggerInstance = winston.createLogger({
   level: config.logs.level,
   levels: winston.config.npm.levels,
   format: winston.format.combine(
      winston.format.timestamp({
         format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
   ),
   transports
});
```
### Set Routes, Controllers & Services
Thes will provide user the api, with the flow will be routes->controllers->services->controllers->return res. 

The routes will provide the api, which are:
- GET /material, to return all materials
- GET /material/:id, to return specific material
- POST /material, to create new material
- PUT /material/:id, to update material
- DELETE /material/:id, to delete material
- GET /type, to return all types
- GET /supplier, to return all suppliers

The controllers then will check request comming with express-validator and ask services to access db.

### Set Unit Testing
Using jest install the requirement and then set up testing in folder index.test.js. The testing consist of get all the success response (status:200) and the failed response (status:404||400) from the api
### Test Result
![alt text](https://github.com/rafidahrafalaia/Odoo/blob/master/images/test_result.JPG?raw=true)

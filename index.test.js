const express = require('express');
const routes = require('./routes');
const supertest = require("supertest");
const bodyParser = require('body-parser');

jest.setTimeout(5000);

function startServer() {
  const app = express();
 
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
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
  
  
  return app;
}


const app = startServer();

describe("MATERIAL TEST", () => {
  const value_post = {
    "name": "POST",
    "code": "POST",
    "type": "dada0c40-539f-479a-99aa-899b1122aadc",
    "buy_price": 1000,
    "supplier": "dada0c40-539f-479a-8274-899b9112addc"
    };
  const value_fail = {
    "name": "POST",
    "code": "",
    "type": "dada0c40-539f-479a-99aa-899b1122aadc",
    "buy_price": 1000,
    "supplier": "dada0c40-539f-479a-8274-899b9112addc"
    };
  const value_put = {
    "name": "PUT",
    "code": "PUT",
    "type": "dada0c40-539f-479a-99aa-899b1122aadc",
    "buy_price": 500,
    "supplier": "dada0c40-539f-479a-8274-899b9112addc"
    };

  test("GET ALL SUCCESS", async () => {
    await supertest(app).get("/material")
      .expect(200);
  });

  test("GET ALL SUCCESS WITH OPTIONAL", async () => {
    await supertest(app).get("/material?type=test")
      .expect(200);
  });

  let elementId;
  test("POST SUCCESS", async () => {
    await supertest(app)
    .post("/material")
        .send(value_post)
        .expect(200)
        .expect((res) => {
          elementId = res.body.id;
        })
  });

  test("POST FAIL", async () => {
    await supertest(app)
    .post("/material")
        .send(value_fail)
        .expect(400)
  });

  test("GET SUCCESS", async () => {
    await supertest(app).get("/material/"+elementId)
      .expect(200);
  });
  
  test("GET FAIL", async () => {
      await supertest(app).get("/material/"+"dada0c40-539f-479a-99aa-8ad11722aadc")
        .expect(404);
  });


  test("PUT SUCCESS", async () => {
    await supertest(app).put("/material/"+elementId).send(value_put)
    .expect(200);
  });

  test("PUT FAIL", async () => {
    await supertest(app).put("/material/"+elementId).send(value_fail)
    .expect(400);
  });


  test("DELETE SUCCESS", async () => {
    await supertest(app).delete("/material/"+elementId)
    .expect(200); 
});

  test("DELETE FAIL", async () => {
      await supertest(app).delete("/material/"+"randomID")
      .expect(400); 
  });
});

describe("SUPPLIER TEST", () => {
  test("GET ALL SUCCESS", async () => {
    await supertest(app).get("/supplier")
      .expect(200);
  });

});

describe("TYPE TEST", () => {
  test("GET ALL SUCCESS", async () => {
    await supertest(app).get("/type")
      .expect(200);
  });
});
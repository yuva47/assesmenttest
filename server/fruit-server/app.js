const express = require("express");
const FruitRoutes = require("./fruit-routes");
const bodyParser = require("body-parser");
const CartRoutes = require("./cart-routes");

const app = express();
const port = process.env.PORT || 1234;


const apiRoutes = express.Router();

// TODO-1: need to npm install and run to start up this fruit server

// setup the fruit routes
FruitRoutes.setup(apiRoutes);


// TODO-4: need to setup route for cart purchase
CartRoutes.setup(apiRoutes);

app.use(bodyParser.json());

// all REST api calls should be under api
app.use("/api", apiRoutes);

// basic get route for the system
app.get("/", (req, res) => {
  res.send("Welcome to fruit server 1.0.0");
});

// listening on the nodemon port configured in @see package.json
app.listen(port, (req, res) => {
  console.log(
    `fruit server started from nodemon and listening at http://localhost:${port}`
  );
});

// Custom Error handler for fruit server
app.use(function (err, req, res, next) {
  // TODO-5: handle common errors  
  if (res.headersSent) {
    return next(err)
  }

  if (err.name == "SecurityError") {
    return res.status(403).send({ msg: err.message });
  }
  if (err.name == "TypeError" || err.name == "OutOfStockError") {
    return res.status(400).send({ msg: err.message });
  }
  if (err.name == "SyntaxError") {
    return res.status(404).send({ msg: err.message });
  }



  res.status(500).send({ msg: err.message })

});

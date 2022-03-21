const express = require("express");
const FruitService = require("./fruit-service");

class FruitRoutes {

  /**
   * Setups the routes for fruit related REST api calls
   */
  static setup(root) {
    const fruitRouter = express.Router();

    /**
     * TODO-2 - need to expose an api that allows a caller to get a list of all fruits in the system
     *  @requirements use the @FruitService methods to interact with the fruit inventory
     *  @notes remember all methods are @see async on the FruitService
     */

    fruitRouter.get("/", async (_, res, next) => {
      const response = await FruitService.getAllFruits().catch(next);
      if (response) res.send(response);

    });


    /**
     * TODO-3 - need to expose an api that allows a caller to get a specific fruit in the system
     *  @requirements use the @FruitService methods to interact with the fruit inventory
     *  @requirements take consideration when fruit does not exist
     *  @notes remember all methods are @see async on the FruitService
     */

    fruitRouter.get("/:name", async (req, res, next) => {
      const { name } = req.params;
      const response = await FruitService.getFruit(name);
      if (response) res.send(response);
      else next(new SyntaxError("Fruit not found"));
    });

    root.use(fruitRouter);
  }
}

module.exports = FruitRoutes;

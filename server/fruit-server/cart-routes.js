const express = require("express");
const CartService = require("./cart-service");

class CartRoutes {


  static setup(root) {
    const cartRouter = express.Router();

    cartRouter.post("/cart", async (req, res, next) => {
      const result = await CartService.purchase(req.body).catch(next);
      if (result === true) {
        res.send({ msg: "Payment Success" });
      } else if (result === false) {
        res.status(401).send({ msg: "Payment Declined" });
      }
    });

    root.use(cartRouter);
  }
}

module.exports = CartRoutes;

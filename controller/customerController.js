const xendit = require("../config/xenditConfig");
const { Cart } = require("../models/index");
class CustomerController {
  static async buy(req, res, next) {
    try {
      const { amount, description } = req.body;
      const { postId } = req.params;
      const { id } = req.userData;
      const resp = await xendit.createInvoice({
        externalID: description + new Date(),
        amount: amount,
        description: description,
        invoice_duration: 86400,
      });

      const newCart = await Cart.create({
        postId,
        userId: id,
        status: resp.status,
        invoiceUrl: resp.invoice_url,
      });
      res.status(201).json({ newCart });
    } catch (err) {
      next(err);
    }
  }

  static async confirmed(req, res, next) {
    try {
      //data
    } catch (err) {
      next(err);
    }
  }

  static async cartList(req, res, next) {
    try {
      //cartList
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;

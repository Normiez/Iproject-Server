const xendit = require("../config/xenditConfig");
const { Cart, Post } = require("../models/index");
class CustomerController {
  static async buy(req, res, next) {
    try {
      const { postId } = req.params;
      const { id } = req.userData;
      const respond = await Post.findOne({ where: { id: postId } });
      if (!respond || respond.length < 1) {
        throw new Error("POST_NOT_FOUND");
      }
      const extId = respond.title.split(" ").join("-");
      const money = parseInt(respond.price.replace(/,.*|[^0-9]/g, ""), 10);
      const resp = await xendit.createInvoice({
        externalID: extId + "_" + Date.now(),
        amount: money,
        description: respond.title,
        invoice_duration: 86400,
      });
      const newCart = await Cart.create({
        postId: respond.id,
        userId: id,
        status: resp.status,
        invoiceUrl: resp.invoice_url,
        externalID: resp.external_id,
      });
      res.status(201).json({ newCart });
    } catch (err) {
      next(err);
    }
  }

  static async confirmed(req, res, next) {
    try {
      const { status, external_id } = req.body;
      const respond = await Cart.findOne({
        where: { externalID: external_id },
      });

      await Cart.update(
        {
          status,
        },
        { where: { id: respond.id } }
      );
    } catch (err) {
      next(err);
    }
  }

  static async cartList(req, res, next) {
    try {
      const respond = await Cart.findAll({
        where: {
          userId: req.userData.id,
        },
        include: { model: Post },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(respond);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;

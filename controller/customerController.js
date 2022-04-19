class CustomerController {
  static async buy(req, res, next) {
    try {
      res.json("masukkkkk");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;

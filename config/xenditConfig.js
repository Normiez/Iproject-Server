const Xendit = require("xendit-node");
const x = new Xendit({
  secretKey: process.env.XENDIT_KEY,
});
const { Invoice } = x;
const xendit = new Invoice();

module.exports = xendit;

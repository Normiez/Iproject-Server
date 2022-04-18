const errHandler = (err, req, res, next) => {
  if (err.name) {
    res.json(err.name, "<<<<<<< name");
    res.json(err.message, "<<<<<<<");
  }
};

module.exports = errHandler;

const errHandler = (err, req, res, next) => {
  if (err.code === "auth/email-already-in-use") {
    res.status(400).json({ message: "Email already exist" });
  } else if (err.code === "auth/weak-password") {
    res.status(400).json({ message: "Password is too weak" });
  } else if (
    err.code === "auth/missing-email" ||
    err.message === "EMAIL_REQUIRED"
  ) {
    res.status(400).json({ message: "Email is required" });
  } else if (err.code === "auth/invalid-email") {
    res.status(400).json({ message: "Email is invalid" });
  } else if (err.message === "PASSWORD_REQUIRED") {
    res.status(400).json({ message: "Password is required" });
  } else if (err.message === "ROLE_REQUIRED") {
    res.status(400).json({ message: "Role is required" });
  } else if (
    err.code === "auth/wrong-password" ||
    err.message === "INVALID_USER"
  ) {
    res.status(401).json({ message: "Invalid email or password" });
  } else if (
    err.message === "INVALID_TOKEN" ||
    err.name === "JsonWebTokenError"
  ) {
    res.status(401).json({ message: "Invalid token" });
  } else {
    res.json(err.name);
  }
};

module.exports = errHandler;

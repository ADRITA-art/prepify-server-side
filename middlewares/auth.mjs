import jwt from 'jsonwebtoken';
const SECRET_KEY = "QUARTER";

const auth = (req, res, next) => {
  try {
    var token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      var user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
    } else {
      res.status(401).json({ success: false, message: "Unauthorized User" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Unauthorized User" });
  }
};

export default auth;
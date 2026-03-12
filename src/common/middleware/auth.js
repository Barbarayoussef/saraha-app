import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  try {
    let { authorization } = req.headers;
    let [bearer, token] = authorization.split(" ");
    let signature = "";
    switch (bearer) {
      case "Admin":
        signature = "sara7aAdmin";
        break;
      case "User":
        signature = "sara7aUser";
        break;
    }
    console.log(token, signature, "from the auth middleware");

    let decode = jwt.verify(token, signature);
    console.log(decode, "hiii");

    req.user = decode;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

export const generateBothToken = (user) => {
  let signature = "";
  switch (user.role) {
    case "admin":
      signature = "sara7aAdmin";
      break;
    case "user":
      signature = "sara7aUser";
      break;
  }
  console.log(user._id);

  let accessToken = jwt.sign({ id: user._id }, signature, {
    expiresIn: "30m",
  });
  console.log(accessToken);

  let refreshToken = jwt.sign({ id: user._id }, signature, { expiresIn: "1d" });
  let token = { accessToken, refreshToken };
  return token;
};
export const generateAccessToken = (user) => {
  let signature = "";
  switch (user.role) {
    case "admin":
      signature = "sara7aAdmin";
      break;
    case "user":
      signature = "sara7aUser";
      break;
  }
  let accessToken = jwt.sign({ id: user._id }, signature, {
    expiresIn: "30m",
  });
  console.log({ accessToken });

  return { accessToken };
};

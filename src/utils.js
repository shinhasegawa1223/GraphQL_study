const jwt = require("jsonwebtoken"); //token
APP_SECRET = "Graphql-is-aw3some";
function getTokenPayload(token) {
  //token before info  (user.id)
  return jwt.verify(token, APP_SECRET);
}

//get user id
function getUserId(req, authToken) {
  if (req) {
    //header  auth
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("un find token");
      }
      const { userId } = getTokenPayload(token);

      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }
  throw new Error(" not auth");
}

module.exports = {
  APP_SECRET,
  getUserId,
};

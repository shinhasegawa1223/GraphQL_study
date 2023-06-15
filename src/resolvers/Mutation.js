const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { APP_SECRET } = require("../utils");
// new create user

// args = email, password, name
async function signup(parent, args, context) {
  //password setting
  const password = await bcrypt.hash(args.password, 10);

  //create new user
  const user = await context.prisma.user.create({
    data: {
      //スプレッド構文で取り出す
      //passwordだけ上書き
      ...args, //email, password, name
      password,
    },
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

// user login
async function login(parent, args, context) {
  // search email
  // password check
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error(" don't seaarch user");
  }
  const vaild = await bcrypt.compare(args.password, user.password);
  if (!vaild) {
    //worng password
    throw new Error("not much password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

// news post resolvers
async function post(parent, args, context) {
  const { userId } = context;
  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
}

module.exports = {
  signup,
  login,
  post,
};

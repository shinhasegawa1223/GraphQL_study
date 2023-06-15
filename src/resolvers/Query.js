function feed(parent, args, context) {
  return context.prisma.link.findMany();
}

//どこでも使えるようにするおまじない
module.exports = {
  feed,
};

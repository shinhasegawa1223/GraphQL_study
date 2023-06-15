//DBにアクセスする為のclient library

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  //prisam.link = schema name にすること m
  //Model Link だから link
  const newLink = await prisma.link.create({
    data: {
      description: "test DB create",
      url: "www.fuck.com",
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}
main()
  .catch((e) => {
    throw e;
  })
  // .finally =　絶対に処理が達という意味になる
  .finally(async () => {
    // Exception processing occurred
    // DB connected
    prisma.$disconnect;
  });
//

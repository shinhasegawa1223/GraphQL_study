const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//GraphQL スキーマ gql
//String! = null NG
// const typeDefs = gql``;

const resolvers = {
Query: {
info: () => "HackerNews クローン",
feed: async (parent, args, context) => {
return context.prisma.link.findMany();
},
},

Mutation: {
post: (parent, args, context) => {
const newLink = context.prisma.link.create({
data: {
url: args.url,
description: args.description,
},
});
return newLink;
},
},
};

const server = new ApolloServer({
//\*\*dirname src ディレクトリの path schema.graphql "utf-8"
typeDefs: fs.readFileSync(path.join(\_\_dirname, "schema.graphql"), "utf-8"),
resolvers,
//resolvers 内のどこでも使用できるにようするために context の設定を行う
context: {
prisma,
},
});

server.listen().then(({ url }) => console.log(`${url} open awake server`));

何かあれば意見をください

スケジュールですが 6h で完了するコースと 11h で完了するコース 2 つ用意しました。
https://docs.google.com/spreadsheets/d/189rv0SUFLR3lxWkOUKuJn_6TW9LJ-xeKYhcfUBSTOT4/edit?usp=sharing

エルスクールで行なっているように基本的に行おうと考えています。
基本的に user の一覧表示は前回で完成したのでそれ以外の記載を全てソースを削除
対象クラス下記参照（※ログインと画像表示周り bookcreate は対象外

・service  
・controller ※mapping は html 側を確認すればよい
・mapper
・dto or entity

dto はテーブルレイアウト見れば作るれる
シーケンスと実施タスクでなんとか作成できると思うので不要かと

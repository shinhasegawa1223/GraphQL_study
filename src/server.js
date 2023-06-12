const { ApolloServer, gql } = require("apollo-server");

//Hackenews
let links = [
  {
    id: "link0",
    description: "Gql test",
    url: "https://www.google.com/?hl=ja",
  },
];

//GraphQLスキーマ gql
//String! = null NG
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }
  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: () => links,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url} open awake server`));

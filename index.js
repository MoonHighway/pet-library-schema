const { ApolloServer } = require("@apollo/server");
const {
  startStandaloneServer,
} = require("@apollo/server/standalone");
const { addMocksToSchema } = require("@graphql-tools/mock");
const {
  makeExecutableSchema,
} = require("@graphql-tools/schema");
const { readFileSync } = require("fs");

const typeDefs = readFileSync(
  "./typeDefs.graphql",
  "UTF-8"
);

async function startApolloServer() {
  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
    }),
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚠 Snowtooth Server Running at ${url}`);
}

startApolloServer();

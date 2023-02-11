const express = require("express");
const { ApolloServer } = require("@apollo/server");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { expressMiddleware } = require("@apollo/server/express4");
const http = require("http");
const cors = require("cors");
const { json } = require("body-parser");

var { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;

async function startApolloServer(resolvers, typeDefs) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();
  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, { context: authMiddleware })
  );

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(`🍔 API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql 🧙`);
    });
  });
}

startApolloServer(resolvers, typeDefs);


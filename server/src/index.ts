require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./database";

const startApolloServer = async (
  typeDefs: any,
  resolvers: any,
  app: Application
) => {
  const db = await connectDatabase();

  app = express();
  const port = process.env.PORT;

  app.use(bodyParser.json({ limit: "20mb" }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  });
  await server.start();
  server.applyMiddleware({ app, path: "/api" });

  app.listen(port);

  console.log(`🚀 [server]: http://localhost:${port}`);
};

startApolloServer(typeDefs, resolvers, express());

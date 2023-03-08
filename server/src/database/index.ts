import { MongoClient, ServerApiVersion } from "mongodb";
import { User, Database, Decoration } from "../lib/types";

const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = new MongoClient(url, {
    serverApi: ServerApiVersion.v1,
  });
  const db = client.db("main");

  return {
    users: db.collection<User>("users"),
    decorations: db.collection<Decoration>("decorations"),
  };
};

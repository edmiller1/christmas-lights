import { Request, Response } from "express";
import { Database, User } from "../../../lib/types";
import { ObjectId } from "mongodb";
import { IResolvers } from "@graphql-tools/utils";
import { LogInArgs, UserArgs } from "./types";

export const userResolvers: IResolvers = {
  Query: {
    users: async (
      _root: undefined,
      {},
      { db, req }: { db: Database; req: Request }
    ): Promise<User[]> => {
      try {
        const userList = await db.users.find({}).toArray();

        if (!userList) {
          throw new Error("users cannot be found");
        }

        return userList;
      } catch (error) {
        throw new Error(`Failed to query users - ${error}`);
      }
    },
    user: async (
      _root: undefined,
      { _id }: UserArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ id: _id });

        if (!user) {
          throw new Error("User cannot be found");
        }

        return user;
      } catch (error) {
        throw new Error(`Failed to get user - ${error}`);
      }
    },
  },
  Mutation: {
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ) => {
      try {
        const loggedInUser = input.result;
        const isNewUser = loggedInUser.isNewUser;

        if (!isNewUser) {
          return await db.users.findOne({ id: loggedInUser });
        }

        const insertResult = await db.users.insertOne({
          _id: loggedInUser.uid,
          token: loggedInUser.accessToken,
          name: loggedInUser.displayName,
          image: loggedInUser.photoURL,
          email: loggedInUser.email,
          decorations: [],
          favourites: [],
          createdAt: loggedInUser.createdAt,
        });

        return await db.users.findOne({ _id: insertResult.insertedId });
      } catch (error) {
        throw new Error(`Failed to log in user - , ${error}`);
      }
    },
  },
  User: {
    id: (user: User): ObjectId | string => {
      return user._id;
    },
  },
};

import { Request, Response } from "express";
import { Cloudinary } from "../../../lib/Cloudinary";
import { Database, Decoration } from "../../../lib/types";
import { IResolvers } from "@graphql-tools/utils";
import { createDecorationArgs, DecorationArgs } from "./types";
import { ObjectId } from "mongodb";

export const decorationResolvers: IResolvers = {
  Query: {
    decoration: async (
      _root: undefined,
      { _id }: DecorationArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<Decoration> => {
      try {
        const decoration = await db.decorations.findOne({ id: _id });

        if (!decoration) {
          throw new Error("Failed to get decoration");
        }

        return decoration;
      } catch (error) {
        throw new Error(`Failed to get decoration - ${error}`);
      }
    },
  },
  Mutation: {
    createDecoration: async (
      _root: undefined,
      { input }: createDecorationArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ) => {
      try {
        const newDecoration = input;

        const insertResult = await db.decorations.insertOne({
          _id: new ObjectId(),
          name: newDecoration.name,
          address: newDecoration.address,
          images: [],
          verified: false,
          rating: 0,
          numRatings: 0,
          views: 0,
          latitude: newDecoration.latitude,
          longitude: newDecoration.longitude,
          country: newDecoration.country,
          city: newDecoration.city,
          createdAt: new Date().toLocaleDateString("en-AU"),
          updatedAt: "",
          year: new Date().getFullYear().toString(),
          userId: newDecoration.userId,
          hideRatings: newDecoration.hideRatings,
          hideViews: newDecoration.hideViews,
        });
        //add the image URL's from cloudinary
        newDecoration.images?.forEach(async (image) => {
          let imageUrl = await Cloudinary.upload(image);
          await db.decorations.updateOne(
            { _id: insertResult.insertedId },
            {
              $push: {
                images: {
                  $each: [imageUrl],
                },
              },
            }
          );
        });

        //add the decoration id to the decorations array on the user document
        await db.users.updateOne(
          { _id: newDecoration.userId },
          { $push: { decorations: { $each: [insertResult.insertedId] } } }
        );

        return await db.decorations.findOne({ _id: insertResult.insertedId });
      } catch (error) {
        throw new Error(`Failed to create decoration - ${error}`);
      }
    },
  },
  Decoration: {
    id: (decoration: Decoration): ObjectId => {
      return decoration._id;
    },
  },
};

import { merge } from "lodash";
import { userResolvers } from "./user/userResolvers";
import { decorationResolvers } from "./decoration/decorationResolvers";

export const resolvers = merge(userResolvers, decorationResolvers);

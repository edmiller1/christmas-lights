import type { TRPCRouterRecord } from "@trpc/server";

import { invalidateSessionToken } from "@acme/auth";
import { eq } from "@acme/db";
import { User } from "@acme/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
  signOut: protectedProcedure.mutation(async (opts) => {
    if (!opts.ctx.token) {
      return { success: false };
    }
    await invalidateSessionToken(opts.ctx.token);
    return { success: true };
  }),
  getDatabaseSyncStatus: publicProcedure.query(async ({ ctx }) => {
    const auth = ctx.session;

    if (!auth) {
      return { isSynced: false };
    }

    const user = await ctx.db.query.User.findFirst({
      where: eq(User.id, auth.user.id),
    });

    console.log("USER in DB: ", user);

    if (!user) {
      await ctx.db.update(User).set({
        admin: false,
        notificationsOnAppRating: true,
        notificationsOnAppVerification: true,
        notificationsByEmailRating: true,
        notificationsByEmailVerification: true,
        email: auth.user.email ?? "",
        image: auth.user.image ?? "",
        name: auth.user.name ?? "",
        plan: "FREE",
      });
    }

    return { isSynced: true };
  }),
} satisfies TRPCRouterRecord;

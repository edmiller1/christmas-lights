import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

//ENUMS
export const planEnum = pgEnum("plan", ["FREE", "PRO"]);

//TABLES
export const Post = pgTable("post", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const User = pgTable("user", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 255 }),
  email: t.varchar({ length: 255 }).notNull(),
  emailVerified: t.timestamp({ mode: "date", withTimezone: true }),
  image: t.varchar({ length: 255 }),
  plan: planEnum().default("FREE"),
  admin: t.boolean().default(false),
  notificationsOnAppVerification: t.boolean().default(false),
  notificationsOnAppRating: t.boolean().default(false),
  notificationsByEmailVerification: t.boolean().default(false),
  notificationsByEmailRating: t.boolean().default(false),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const Account = pgTable(
  "account",
  (t) => ({
    userId: t
      .uuid()
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    type: t
      .varchar({ length: 255 })
      .$type<"email" | "oauth" | "oidc" | "webauthn">()
      .notNull(),
    provider: t.varchar({ length: 255 }).notNull(),
    providerAccountId: t.varchar({ length: 255 }).notNull(),
    refresh_token: t.varchar({ length: 255 }),
    access_token: t.text(),
    expires_at: t.integer(),
    token_type: t.varchar({ length: 255 }),
    scope: t.varchar({ length: 255 }),
    id_token: t.text(),
    session_state: t.varchar({ length: 255 }),
  }),
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const Session = pgTable("session", (t) => ({
  sessionToken: t.varchar({ length: 255 }).notNull().primaryKey(),
  userId: t
    .uuid()
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  expires: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
}));

export const Decoration = pgTable("decoration", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 255 }).notNull(),
  address: t.varchar({ length: 255 }).notNull(),
  verified: t.boolean().default(false),
  verificationSubmitted: t.boolean().default(false),
  latitude: t.doublePrecision().notNull(),
  longitude: t.doublePrecision().notNull(),
  country: t.varchar({ length: 255 }).notNull(),
  region: t.varchar({ length: 255 }).notNull(),
  city: t.varchar({ length: 255 }).notNull(),
  year: t.varchar({ length: 255 }).notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
  userId: t
    .uuid()
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  routeId: t
    .uuid()
    .notNull()
    .references(() => Route.id, { onDelete: "cascade" }),
}));

export const DecorationImage = pgTable("decoration_image", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  url: t.varchar({ length: 255 }).notNull(),
  decorationId: t
    .uuid()
    .notNull()
    .references(() => Decoration.id, { onDelete: "cascade" }),
}));

export const Rating = pgTable("rating", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  rating: t.integer().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
  decorationId: t
    .uuid()
    .notNull()
    .references(() => Decoration.id),
  userId: t
    .uuid()
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
}));

export const View = pgTable("view", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  createdAt: t.timestamp().defaultNow().notNull(),
  decorationId: t
    .uuid()
    .notNull()
    .references(() => Decoration.id, { onDelete: "cascade" }),
}));

export const Notification = pgTable("notification", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 255 }).notNull(),
  content: t.text().notNull(),
  unread: t.boolean().default(true),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
  userId: t
    .uuid()
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
}));

export const Report = pgTable("report", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  reasons: t.text().notNull().array(),
  additionalInfo: t.text().notNull(),
  unresolved: t.boolean().default(false),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
  decorationId: t
    .uuid()
    .notNull()
    .references(() => Decoration.id, { onDelete: "cascade" }),
  userId: t
    .uuid()
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
}));

export const Verification = pgTable("verification", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  document: t.text().notNull(),
  approved: t.boolean().default(false),
  rejected: t.boolean().default(false),
  rejectedReason: t.text(),
  archived: t.boolean().default(false),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
  decorationId: t
    .uuid()
    .notNull()
    .references(() => Decoration.id, { onDelete: "cascade" }),
}));

export const Route = pgTable("route", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 255 }).notNull(),
  description: t.text(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

//RELATIONS
export const UserRelations = relations(User, ({ many }) => ({
  accounts: many(Account),
  decorations: many(Decoration),
  ratings: many(Rating),
  favourites: many(Decoration),
  history: many(Decoration),
  reports: many(Report),
  routes: many(Route),
}));

export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, { fields: [Account.userId], references: [User.id] }),
}));

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));

export const DecorationRelations = relations(Decoration, ({ many, one }) => ({
  images: many(DecorationImage),
  owner: one(User, { fields: [Decoration.userId], references: [User.id] }),
  ratings: many(Rating),
  views: many(View),
  reports: many(Report),
  verification: one(Verification, {
    fields: [Decoration.id],
    references: [Verification.decorationId],
  }),
  route: one(Route, {
    fields: [Decoration.routeId],
    references: [Route.id],
  }),
}));

//SCHEMAS
export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

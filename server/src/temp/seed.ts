import { User, Decoration } from "../lib/types";
import { ObjectId } from "mongodb";
import { connectDatabase } from "../database";

export const users: User[] = [
  {
    _id: new ObjectId("5d378db94e84753160e08b30"),
    token: "token_************",
    name: "Benny Boy",
    email: "bennyboy@gmail.com",
    image:
      "https://instagram.fchc1-1.fna.fbcdn.net/v/t51.2885-15/325254956_927400085338113_6688911625571751136_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=instagram.fchc1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=X7v7ZGHj1QkAX-JUiLZ&tn=RUZskALjmc82O8Fi&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzAxNDUxNDkzMDI3NTAxNjIyNw%3D%3D.2-ccb7-5&oh=00_AfBbmdZvciL1UKhCTWlgJQ1qkndPA0Vm41xc1mdGpmWKjg&oe=63E56367&_nc_sid=1527a3",
    decorations: [],
    favourites: [],
    createdAt: Date.now.toString(),
  },
  {
    _id: new ObjectId("63e0398a323bffccaa2eeac0"),
    token: "token_************",
    name: "Lilly Pad",
    email: "lillypad@gmail.com",
    image:
      "https://instagram.fchc1-1.fna.fbcdn.net/v/t51.2885-15/324401777_1245091779408097_4880765644465741865_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=instagram.fchc1-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=-q-RMR5quVwAX8mXozy&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzAxMzI0ODM4Njc2NDk3NDc2OA%3D%3D.2-ccb7-5&oh=00_AfCmWtjTAun_InfxapCpJgRCt6VdlmoDWiBdhjgaQXGVnA&oe=63E5B788&_nc_sid=1527a3",
    decorations: [],
    favourites: [],
    createdAt: Date.now.toString(),
  },
  {
    _id: new ObjectId("63e0397c323bffccaa2eeabf"),
    token: "token_************",
    name: "Sunny Dog",
    email: "sunnydog@gmail.com",
    image:
      "https://instagram.fchc1-1.fna.fbcdn.net/v/t51.2885-15/327939104_5938862142873813_9140570490325747663_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=instagram.fchc1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=Lb2XH8Ewg_gAX9iOQVQ&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzAyNzY4OTcxODQ1NTY1NjM0MA%3D%3D.2-ccb7-5&oh=00_AfBb7jz2SOv6JXj_EmrXZAoY5K7GdhaZcOE0VkLBISjO6Q&oe=63E4DC54&_nc_sid=1527a3",
    decorations: [],
    favourites: [],
    createdAt: Date.now.toString(),
  },
];

const seedDb = async () => {
  try {
    console.log("🍁 [seed]: running...");

    const db = connectDatabase();

    for (const user of users) {
      await (await db).users.insertOne(user);
    }

    console.log("🍁 [seed]: Success");
  } catch (error) {
    throw new Error(`Failed to seed database - ${error}`);
  }
};

//seedDb();

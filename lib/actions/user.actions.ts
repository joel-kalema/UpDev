"use server";

import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import { SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  connectToDB();
  try {

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUser(userId: string) {
  try {
    connectToDB();


    return await User.findOne({id: userId})
    // .populate({
    //   path: communities,
    //   model: community
    // })
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

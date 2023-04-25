import { PrismaClient } from "@prisma/client";
import { createServerData$, redirect } from "solid-start/server";
import { getUser } from "./session";

/**
 * Uses createServerData to connect to Prisma then uses getUser to get the user
 * @returns {*}
 */
export const useUser = () =>
  createServerData$(async (_, { request }) => {
    const db = new PrismaClient();
    const user = await getUser(db, request);
    if (!user) {
      throw redirect("/login");
    }
    return user;
  });

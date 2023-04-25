import { createServerData$, redirect } from "solid-start/server";
import db from "../src/db";
import { getUser } from "../src/db/session";
/**
 * Uses createServerData to connect to Prisma then uses getUser to get the user
 * @returns {*}
 */
export const useUser = () =>
  createServerData$(async (_, { request }) => {
    const user = await getUser(db, request);
    if (!user) {
      throw redirect("/login");
    }
    return user;
  });

import { redirect } from "solid-start/server";
// the native session storage by solid js
import { createCookieSessionStorage } from "solid-start/session";
// imports the database connection from src/db/index.jsx where a connection is established by prisma
import { db } from ".";

/**
 * Register a user in the database
 * @param {{ username: any; password: any; }} { username, password }
 * @returns {unknown}
 */
export async function register({ username, password }) {
  return db.user.create({
    data: {
      username: username,
      password,
    },
  });
}

/**
 * Login: Uses prisma to find a user in the database
 * @param {{ username: any; password: any; }} { username, password }
 * @returns {unknown}
 */
export async function login({ username, password }) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) return null;
  const isCorrectPassword = password === user.password;
  if (!isCorrectPassword) return null;
  return user;
}
const sessionSecret = import.meta.env.SESSION_SECRET;


const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: true,
    secrets: ["hello"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});


/**
 * Get user session from cookie
 * @param {*} request
 * @returns {*}
 */
export function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}

/**
 * Gets User ID from session
 * @param {*} request
 * @returns {unknown}
 */
export async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}
/**
 * Upon visiting a page, check if the user is logged in. If not, redirect to login page.
 * @param {*} request
 * @param {*} [redirectTo=new URL(request.url).pathname]
 * @returns {unknown}
 */
export async function requireUserId(
  request,
  redirectTo = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

/**
 * getUser is a function that takes a database and a request and returns a user
 * @param {*} db
 * @param {*} request
 * @returns {unknown}
 */
export async function getUser(db, request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }
  try {
    // findUnique is a function that takes a query and returns a user
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch {
    throw logout(request);
  }
}

/**
 * Logs out a user by destroying the session
 * @param {*} request
 * @returns {unknown}
 */
export async function logout(request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

/**
 * Creates a session after user logs in
 * @param {*} userId
 * @param {*} redirectTo
 * @returns {unknown}
 */
export async function createUserSession(userId, redirectTo) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

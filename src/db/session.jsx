import { redirect } from "solid-start/server";
import { createCookieSessionStorage } from "solid-start/session";
import { db } from ".";
export async function register({ username, password }) {
  return db.user.create({
    data: {
      username: username,
      password,
    },
  });
}
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
    name: "Steven_session",
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: false,
    secrets: ["hello"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});
export function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}
export async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  const test = session.get("test");
  if (!userId || typeof userId !== "string") return null;
  console.log(test, userId)
  return userId
}
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

export async function getUser(db, request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }
  try {
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
export async function logout(request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
export async function createUserSession(userId, redirectTo) {
  const session = await storage.getSession();
  session.set("userId", userId);
  session.set('test', "Steven")
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

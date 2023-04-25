import { Show } from "solid-js";
import { useParams, useRouteData } from "solid-start";
import { FormError } from "solid-start/data";
import {
  createServerAction$,
  createServerData$,
  redirect,
} from "solid-start/server";
import { db } from "~/db";
import { createUserSession, getUser, login, register } from "~/db/session";

/**
 * Username validation
 * @param {*} username
 * @returns {string}
 */
function validateUsername(username) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

/**
 * Password validation
 * @param {*} password
 * @returns {string}
 */
function validatePassword(password) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

/**
 * No idea what is happening
 * @returns {*}
 */
export function routeData() {
  return createServerData$(async (_, { request }) => {
    if (await getUser(db, request)) {
      throw redirect("/");
    }
    return {};
  });
}

/**
 * Form that handles logging in and registering
 * @returns {*}
 */
export default function Login() {
  const data = useRouteData();
  const params = useParams();
  const [loggingIn, { Form }] = createServerAction$(async (form) => {
    const loginType = form.get("loginType");
    const username = form.get("username");
    const password = form.get("password");
    const redirectTo = form.get("redirectTo") || "/";
    if (
      typeof loginType !== "string" ||
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof redirectTo !== "string"
    ) {
      throw new FormError(`Form not submitted correctly.`);
    }
    const fields = {
      loginType,
      username,
      password,
    };
    const fieldErrors = {
      username: validateUsername(username),
      password: validatePassword(password),
    };
    if (Object.values(fieldErrors).some(Boolean)) {
      throw new FormError("Fields invalid", {
        fieldErrors,
        fields,
      });
    }
    switch (loginType) {
      case "login": {
        const user = await login({
          username,
          password,
        });
        if (!user) {
          throw new FormError(`Username/Password combination is incorrect`, {
            fields,
          });
        }
        return createUserSession(`${user.id}`, redirectTo);
      }
      // error handling for user creation
      case "register": {
        const userExists = await db.user.findUnique({
          where: {
            username,
          },
        });
        // error if user exists
        if (userExists) {
          throw new FormError(`User with username ${username} already exists`, {
            fields,
          });
        }
        const user = await register({
          username,
          password,
        });
        // error handling for user creation
        if (!user) {
          throw new FormError(
            `Something went wrong trying to create a new user.`,
            {
              fields,
            }
          );
        }
        return createUserSession(`${user.id}`, redirectTo);
      }
      default: {
        throw new FormError(`Login type invalid`, {
          fields,
        });
      }
    }
  });
  
  return (
    <main>
      <h1>Login</h1>
      <Form>
        <input
          type="hidden"
          name="redirectTo"
          value={params.redirectTo ?? "/"}
        />
        <fieldset>
          <legend>Login or Register?</legend>
          <label>
            <input type="radio" name="loginType" value="login" checked={true} />{" "}
            Login
          </label>
          <label>
            <input type="radio" name="loginType" value="register" /> Register
          </label>
        </fieldset>
        <div>
          <label for="username-input">Username</label>
          <input name="username" placeholder="kody" />
        </div>
        {/* Special tag that is revealed when some conditional fits. Here, the conditional states it will show if it cannot log in. Evals the conditional if any part of the conditional is evaulated to true */}
        <Show when={loggingIn.error?.fieldErrors?.username}>
          <p role="alert">{loggingIn.error.fieldErrors.username}</p>
        </Show>
        <div>
          <label for="password-input">Password</label>
          <input name="password" type="password" placeholder="twixrox" />
        </div>
        <Show when={loggingIn.error?.fieldErrors?.password}>
          <p role="alert">{loggingIn.error.fieldErrors.password}</p>
        </Show>
        <Show when={loggingIn.error}>
          <p role="alert" id="error-message">
            {loggingIn.error.message}
          </p>
        </Show>
        <button type="submit">{data() ? "Login" : ""}</button>
      </Form>
    </main>
  );
}

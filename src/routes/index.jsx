import { refetchRouteData, useRouteData } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { logout } from "~/db/session";
import { useUser } from "../db/useUser";
export function routeData() {
  return useUser();
}
export default function Home() {
  const user = useRouteData();
  const [, { Form }] = createServerAction$((f, { request }) => logout(request));
  return (
    <main class="full-width">
      <h1>Hello {user()?.username}</h1>
      <h3>This sucks</h3>
      <button onClick={() => refetchRouteData()}>Refresh</button>
      <Form>
        <button name="logout" type="submit">
          Logout
        </button>
      </Form>
    </main>
  );
}

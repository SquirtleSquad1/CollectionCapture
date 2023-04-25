import { refetchRouteData, useRouteData } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { logout } from "~/db/session";
import { useUser } from "../db/useUser";
/**
 * 
 * @returns {*}
 */
export function routeData() {
  return useUser();
}
/**
 * This function exporrts the Home page
 *
 * @returns {*}
 */
export default function Home() {
  const user = useRouteData();
  const [, { Form }] = createServerAction$((f, { request }) => logout(request));
  return (
    <main class="full-width bg-gray-100">
      <h1 class="text-3xl font-bold">Hello {user()?.username}</h1>
      <h3 class="text-lg font-medium mt-4">Testing solidjs.</h3>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => refetchRouteData()}>Refresh</button>
      <Form class="mt-4">
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" name="logout" type="submit">
          Logout
        </button>
      </Form>
    </main>

  );
}

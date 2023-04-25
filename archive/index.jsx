import { useRouteData } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { logout } from "~/db/session";
import Header from "../components/Header";
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
    <>
      <Header />
      <main class="full-width bg-gray-100">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"> 
          <h1>Hello</h1>
        </div>
      </main>
    </>

  );
}

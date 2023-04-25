import { refetchRouteData, useRouteData } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { logout } from "~/db/session";
import { useUser } from "../db/useUser";
import Card from "~/components/Card";
export function routeData() {
  return useUser();
}
export default function Home() {
  const user = useRouteData();
  const [, { Form }] = createServerAction$((f, { request }) => logout(request));
  
  return (
    <main class="full-width">
      <Card id={'testingId'} imageUrl={'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card'}/>
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

// import { createSignal, For } from "solid-js";
// export default function Home() {
//   const [cardName, setCardName] = createSignal("");
//   const [cardData, setCardData] = createSignal(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // handle form submission here, e.g. by pinging the express endpoint
//     await fetch(`/api/getCards?name=${cardName()}`)
//       .then((response) => response.json())
//       .then((data) => setCardData(data));
//   };

//   const handleInputChange = (event) => {
//     setCardName(event.target.value);
//   };

//   return (
//     <main class="full-width">
//       <h1 class="text-3xl font-bold underline">{cardName()}</h1>
//       <form onSubmit={handleSubmit} id="card-search">
//         <input
//           type="text"
//           placeholder="Name of card"
//           value={cardName()}
//           onInput={handleInputChange}
//         />
//         <button type="submit">Search</button>
//       </form>

//       <div class="border-2 border-black" id="card-display">
//         {cardData() ? (
//           <ul>
//             <For each={cardData()}>{(card) => (
//               <li >{card.name}</li>
//             )}</For>
//           </ul>
//         ) : (
//           <h3>No cards found</h3>
//         )}
//       </div>
//     </main>
//   );
// }

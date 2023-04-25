import Navbar from "../components/Navbar";

export default function Home() {
  const user = useRouteData();
  
  return (
    <main class="full-width">
      <Navbar request={}/>
      <h3>This sucks</h3>
      <button onClick={() => refetchRouteData()}>Refresh</button>

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

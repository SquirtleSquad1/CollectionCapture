import axios from "axios";

export default function Card(props) {

  async function handleClick() {
    try {
      const card = await axios.post("/api/card", {
          id: props.id,
          name: props.cardName,
          imageUrl: props.imageUrl
      })

      // const user_card = await axios.put("/api/cards", {
      //     id: props.id,
      // })

    }
   catch(error) {
    console.log(error)
   }
  }

  return(
  <div class="flex flex-col w-fit">
    <img src={props.imageUrl} />
    <button class="hover:bg-blue-500 hover:text-white" onClick={handleClick}>Add Card to Collection</button>
  </div>
  )
}

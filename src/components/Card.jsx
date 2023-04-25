import axios from "axios";
import { createSignal, Switch, Match } from "solid-js";

export default function Card(props) {
  const [success, setSuccess] = createSignal(false)
  const [error, setError] = createSignal(false)

  async function handleClick() {
    try {
      const card = await axios.post("/api/card", {
          id: props.id,
          imageUrl: props.imageUrl
      })
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    }
   catch(error) {
    setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
   }
  }

  return(
  <div class="flex flex-col w-fit">
    <img src={props.imageUrl} />
    <Switch>
      <Match when={success()}>
      <button class="bg-green-500 text-white cursor-auto">Successfully Added!</button>
      </Match>
      <Match when={error()}>
      <button class="bg-red-500 text-white cursor-auto">Error Adding Card</button>
      </Match>
      <Match when={!success() && !error()} >
      <button class="hover:bg-blue-500 hover:text-white disabled" onClick={handleClick}>Add Card to Collection</button>
      </Match>
    </Switch>
  </div>
  )
}

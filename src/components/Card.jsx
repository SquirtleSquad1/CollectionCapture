import axios from "axios";
import { createSignal, Switch, Match } from "solid-js";

export default function Card(props) {
  const [success, setSuccess] = createSignal(false)
  const [error, setError] = createSignal(false)
  const [deckView, setDeckView] = createSignal(false)

  async function handleAddCollection() {
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

  async function handleAddDeck() {
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

  async function handleRemoveDeck() {
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

  function errMsg(type) {
    return type === 'deck' ? 'Error Removing Card' : 'Error Adding Card' 
  }
  function successMsg(type) {
    return type === 'deck' ? 'Removed Card!' : 'Added Card!' 
  }

  return(
  <div class="flex flex-col w-fit">
    <img src={props.imageUrl} />
    <Switch>
      <Match when={success()}>
      <button class="bg-green-500 text-white cursor-auto">{successMsg(props.type)}</button>
      </Match>
      <Match when={error()}>
      <button class="bg-red-500 text-white cursor-auto">{errMsg(props.type)}</button>
      </Match>
      <Match when={!success() && !error()} >
        <Switch>
          <Match when={props.type == 'search'}>
            <button class="hover:bg-blue-500 hover:text-white disabled" onClick={handleAddCollection}>Add Card to Collection</button>
          </Match>
          <Match when={props.type == 'collection'}>
            <button class="hover:bg-blue-500 hover:text-white disabled" onClick={handleAddDeck}>Add Card to Deck</button>
          </Match>
          <Match when={props.type == 'deck'}>
            <button class="hover:bg-red-500 hover:text-white disabled" onClick={setDeckView(true)}>Remove Card From Deck</button>
          </Match>
        </Switch>
      
      </Match>
    </Switch>
  </div>
  )
}

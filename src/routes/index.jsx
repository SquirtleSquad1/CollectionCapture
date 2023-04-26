import axios from 'axios';
import { LRUCache } from 'lru-cache';
import { For, createEffect, createSignal, onCleanup } from "solid-js";
import Card from '~/components/Card';
import loading from '../assets/loading.gif';
import { useCollectionContext } from '../context/CollectionContext';

const cache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
})

const Index = () => {
  const { cards, setCards } = useCollectionContext();
  const [search, setSearch] = createSignal('');
  const [data, setData] = createSignal(null);
  const [isLoading, setIsLoading] = createSignal(false);



  createEffect(() => {
    (async function() {
      const serializedCache = window.localStorage.getItem('myCache');
      if (serializedCache) {
        const json = JSON.parse(serializedCache);
        await cache.load(json);
        console.log(`Loaded cache from local storage (${cache.itemCount()} items)`);
      } else {
        console.log('No cache found in local storage');
      }
    })();
  })
  // submit search query to server
  const handleSearch = async(event) => {
    event.preventDefault();
    setIsLoading(true);

    // hash queryname
    const queryKey = `Query${search().trim().replace(/\s/g, '')}`;
    // check if query is in cache
    if (!cache.has(queryKey)){
      const response = await axios.get('/api/getCards', {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            name: search().trim()
          }
      });
      cache.set(queryKey, response.data.filter(card => card.imageUrl))
    }
    setData(cache.get(queryKey));

    console.log(data())

    setIsLoading(false);
  }
  
  const handleInput = (e) => {
    setSearch(e.target.value)
  }


  return (
    <main class="p-4">
      <h1 class="flex justify-center mb-8">Decks</h1>
        <form onSubmit={handleSearch} class='flex-row items-baseline'>
          <input type="text" placeholder="Search for a card" onInput={handleInput}/>
          <button type="submit" class="ml-6 w-20 border-2">Search</button>
        </form>
      <div class="flex mt-8">
        <div class="flex-2 flex-col justify-center self-center w-1/3 h-screen bg-slate-400 rounded-lg mr-4 p-4 overflow-y-auto">

          {
            cards().length > 0 ? <p>{JSON.stringify(cards())}</p> : <p>No cards</p>
          }

          {/* {
            data() && Array.isArray(data()) ? (
              <For each={data()}>{
                (card) => (
                  <div class='border-b-2 border-black w-full pb-2'>{card.name}</div>
                )
              } </For>
            ) : <p>No card data</p>
          } */}

        </div>
        <div class="flex-2 w-2/3 h-screen p-4 bg-slate-500 rounded-lg flex-wrap overflow-y-auto">
          {
            isLoading() ? <div class='w-full flex justify-center'><img src={loading} class='w-16 h-16' /></div> : (
              Array.isArray(data()) ? (
                <For each={data()}>{
                  (card) => {
                      const handleAddCard = () => {
                        setCards((prevCards) => [...prevCards, card]);
                      }
                      return (
                       <Card imageUrl={card.imageUrl} type={'search'} cardId={card.id}/>
                      )
                    }
                  }
              </For>) : <p>No card data</p>
            )
          }
        </div>
      </div>
    </main>
  )
}

onCleanup(() => {
  window.localStorage.setItem('myCache', JSON.stringify(cache.dump()));
})


export default Index;

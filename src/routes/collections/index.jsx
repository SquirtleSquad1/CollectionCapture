import { For } from "solid-js";
import Card from '~/components/Card';
import { useCollectionContext } from '../../context/CollectionContext';

const Collections = () => {
  const { cards } = useCollectionContext();

  return (
    <main class="flex flex-col items-center">
      <h1>{JSON.stringify(cards)}</h1>
      <div class="flex-2 w-2/3 h-screen p-4 bg-slate-500 rounded-lg flex-wrap overflow-y-auto m-auto">
        <For each={cards()}>{
          (el) => {
              console.log(el)
              return (
                <Card imageUrl={el.card.imageUrl} type={'collection'} cardId={el.id}/>
              )
            }
          }
      </For>
        </div>
    </main>
  )
}


export default Collections;

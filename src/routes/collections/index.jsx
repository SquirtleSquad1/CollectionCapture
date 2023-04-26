import { For } from "solid-js";
import Card from '~/components/Card';
import { useCollectionContext } from '../../context/CollectionContext';

const Collections = () => {
  const { cards } = useCollectionContext();

  return (
    <main class="flex flex-col items-center">
      <h1 class="mb-4" >My Collection</h1>
      <div class="flex-2 w-2/3 h-screen p-4 bg-slate-500 rounded-lg flex-wrap overflow-y-auto m-auto justify-center">
        <For each={cards()}>{
          (el) => {
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

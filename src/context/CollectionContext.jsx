import { createContext, useContext, createSignal } from 'solid-js';

const CollectionContext = createContext();

export function useCollectionContext() {
  return useContext(CollectionContext);
}

export const CollectionProvider = (props) => {
  const [cards, setCards] = createSignal([]);

  return (
    <CollectionContext.Provider value={{cards, setCards}}>
      {props.children}
    </CollectionContext.Provider>
  )
}

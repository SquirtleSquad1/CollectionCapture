const Index = () => {

  return (
    <main class="p-4">
      <h1 class="flex justify-center">Decks</h1>
      <div class="flex">
        <div class="flex-2 w-1/3 h-screen bg-slate-400 rounded-lg mr-4 p-4">
          <p> left bar </p>
        </div>
        <div class="flex-2 w-2/3 h-screen p-4 bg-slate-500 rounded-lg">
          <p class="flex-col align-top"> Show Card Here! </p>
        </div>
      </div>
    </main>
  )
}

export default Index;

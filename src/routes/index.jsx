import { useEffect } from 'solid-js';
const Home = () => {

  return (
    <main>
      <h1>Home</h1>
      <div class="flex">
        <div class="flex flex-2 border-2 border-black">
          Left bar
        </div>
        <div class="flex flex-1 border-2 border-black">
          Window
        </div>
      </div>
    </main>
  )
}

export default Home;

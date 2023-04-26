import { A } from 'solid-start';
import logo from '../assets/logo.png';
const Navbar = () => {
  return (
    <nav class="flex items-center justify-center flex-wrap bg-teal-500 p-4">
      {/* Title Left */}
      <div class=" text-white mr-6">
        {/* Logo  */}
        <img src={logo} alt="MTG Logo" class="h-8 w-8 mr-5" />
        <span class="font-semibold text-xl tracking-tight">MTG Deck Builder</span>
      </div>
      <ul class='flex ml-auto'>
        <li class="mr-4"><A href="/" class='text-white hover:text-gray-300'>Home</A></li>
        <li class="mr-4"><A href="/collections" class='text-white hover:text-gray-300'>Collections</A></li>
      </ul>
    </nav>
  )
}

export default Navbar;

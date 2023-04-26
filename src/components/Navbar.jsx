import logo from '../assets/logo.png';
const Navbar = () => {
  return (
    <nav class="flex items-center justify-center flex-wrap bg-teal-500 p-4">
      {/* Title Left */}
      <div class=" text-white mr-6 border-4">
        {/* Logo  */}
        <img src={logo} alt="MTG Logo" class="h-8 w-8 mr-5" />
        <span class="font-semibold text-xl tracking-tight">MTG Deck Builder</span>
      </div>
      <ul class='flex ml-auto'>
        <li><a href="#" class='text-white hover:text-gray-300'>Home</a></li>
        <li><a href="#" class='text-white hover:text-gray-300'>Search</a></li>
        <li><a href="#" class='text-white hover:text-gray-300'>Collections</a></li>
        <li><a href="#" class='text-white hover:text-gray-300'>Logout</a></li>
      </ul>
    </nav>
  )
}

export default Navbar;

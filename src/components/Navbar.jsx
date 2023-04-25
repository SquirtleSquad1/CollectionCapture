import logo from '../assets/logo.png';


const Navbar = () => {

  console.log()
  return (
    <nav class="flex items-baseline justify-between flex-wrap bg-teal-500 p-3 rounded-md">
      <div id="logo" class='flex align-center items-baseline border-2 border-black'>
        <img src={logo} alt="MTG Logo" class="h-6 w-6 ml-2 mr-2 " />
        <span class="font-semibold text-xl tracking-tight">MTG Deck Builder</span>
      </div>
      <ul class='flex ml-auto space-x-4 mr-4 border-2 border-black'>
        <li><a href="#" class='text-white hover:text-gray-300'>Home</a></li>
        <li><a href="#" class='text-white hover:text-gray-300'>Search</a></li>
        <li><a href="#" class='text-white hover:text-gray-300'>Collections</a></li>
        {/* if logged in then return username */}
        <li>
          Logout
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;

import { Link } from "react-router-dom"


const NavBar = () => {
  return (
    <div className="w-full flex  fixed justify-between items-center z-50 bg-white shadow">
        <h1 className="gradient-text font-lato font-bold text-2xl">Bete</h1>
        <div className="flex gap-3 font-lato text-lg justify-between items-center">
            <Link to="/landing_page">Home</Link>
            <Link to = "/property_lists">Property</Link>
            <Link to="">Favourties</Link>
            <Link to ="">About Us</Link>
            <Link to = "">Contact Us</Link>

        </div>
      
    </div>
  )
}

export default NavBar

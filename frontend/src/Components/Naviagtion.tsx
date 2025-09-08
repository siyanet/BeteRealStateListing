// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react"; // icons from lucide-react

// const NavBar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="w-full flex fixed justify-between items-center px-4 py-3 z-50 bg-white shadow">
//       <h1 className="gradient-text font-lato font-bold text-2xl">Bete</h1>

//       {/* Hamburger button for mobile */}
//       <div className="md:hidden">
//         <button onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>
//       </div>

//       {/* Nav links */}
//       <div
//         className={`
//           ${isOpen ? "flex" : "hidden"}
//           md:flex gap-4 font-lato text-lg items-center
//           flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none
//         `}
//       >
//         <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
//         <Link to="/property_lists" onClick={() => setIsOpen(false)}>Property</Link>

//         <Link to="/aboutus" onClick={() => setIsOpen(false)}>About Us</Link>
//         <Link to="/contactus" onClick={() => setIsOpen(false)}>Contact Us</Link>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons from lucide-react
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { fetchUser } from "../Redux/authUser";
import Logout from "./Logout";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Access user from redux state
  const { email, auth_user_status } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="w-full flex fixed justify-between items-center px-4 py-3 z-50 bg-white shadow">
      <h1 className="gradient-text font-lato font-bold text-2xl">Bete</h1>

      {/* Hamburger button for mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Nav links */}
      <div
        className={`
          ${isOpen ? "flex" : "hidden"}
          md:flex gap-4 font-lato text-lg items-center
          flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none
        `}
      >
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/property_lists" onClick={() => setIsOpen(false)}>Property</Link>
        <Link to="/aboutus" onClick={() => setIsOpen(false)}>About Us</Link>
        <Link to="/contactus" onClick={() => setIsOpen(false)}>Contact Us</Link>
      

        {/* 👇 Conditionally render Chat link if user is logged in */}
        {auth_user_status === "succeeded" && email ? (
          <>
             <Link to="/chatlist" onClick={() => setIsOpen(false)}>Chat</Link>
             <Logout/>
          </>
       
        ):(
          <>
            <Link to = "/signup" onClick={() => setIsOpen(false)}>LogIn</Link>
            <Link to = "/signupasRealStateOwner" onClick={() => setIsOpen(false)}>Login as RealStateOwner</Link>

          </>
        )}

      </div>
    </div>
  );
};

export default NavBar;

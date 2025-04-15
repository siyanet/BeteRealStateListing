
import { Home, Building, User, MessageCircle, Users, Briefcase, PlusCircle, Star, List, X, Workflow} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
 
const OwnerSideBar = () => {
    const navigate = useNavigate();
    const [isSideBarOpen,setIsSideBarOpen] = useState(false);
    const menuItems = [
        { icon: <Home />, label: "Home" ,path:'/owner-dashboard'},
        { icon: <Building />, label: "Property",path:'/owner-property' },
        { icon: <User />, label: "Profile",path:'/' },
        { icon: <MessageCircle />, label: "Messages",path: '/' },
        { icon: <Workflow/>,label: "Role",path: "/role"},
        { icon: <Users />, label: "Teams" ,path: '/team_member'},
        { icon: <Briefcase />, label: "Agents",path: '/agents' },
        { icon: <PlusCircle />, label: "Add Property",path: '/add_property' },
        { icon: <Star />, label: "Review" ,path:'/'},

      ];
    
  return (
    <div className=" md:h-screen " >
        <div className="md:hidden" >   <button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="text-gray-700 hover:text-amber-500 transition"
        >
          {isSideBarOpen ? <X size={28} /> : <List size={28} />}
        </button></div>
        
        <div className={`border-gray-200 shadow-2xl px-3   z-10  flex flex-col justify-center items-start gap-x-1 gap-y-2  md:gap-x-2 md:gap-y-5 ${isSideBarOpen? 'translate-x-0': '-translate-x-full'} md:translate-x-0 md:h-full `}>
        {menuItems.map((item,index) =>(
        <div key={index} onClick={()=>{navigate(item.path)}} className="flex p-2 rounded-xl items-center gap-3 group hover:bg-amber-500 cursor-pointer ">
            <div className="  text-amber-500 group-hover:text-black group-hover:text-xl">{item.icon}</div>
            
            <h1 className="text-lg font-medium group-hover:text-black group-hover:text-xl">{item.label}</h1>
            </div>
     ))}
     <div className="flex justify-center  items-center p-2"><Logout/></div>

        </div>
        
 
    </div>
  )
}

export default OwnerSideBar

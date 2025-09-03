
import { Home, Building, User, MessageCircle, Users, Briefcase, PlusCircle, Star, List, X, Workflow} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const OwnerSideBar = () => {
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const menuItems = [
    { icon: <Home />, label: "Home", path: "/owner-dashboard" },
    { icon: <Building />, label: "Property", path: "/owner-property" },
    { icon: <User />, label: "Profile", path: "/owner_profile" },
    { icon: <MessageCircle />, label: "Messages", path: "/owner_chatlist" },
    { icon: <Workflow />, label: "Role", path: "/role" },
    { icon: <Users />, label: "Teams", path: "/team_member" },
    { icon: <Briefcase />, label: "Agents", path: "/agents" },
    { icon: <PlusCircle />, label: "Add Property", path: "/add_property" },
    { icon: <Star />, label: "Review", path: "/review" },
  ];

  return (
    <>
      {/* Toggle button for mobile */}
      <div className="md:hidden absolute top-10  z-50">
        <button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="text-gray-700 hover:text-amber-500 transition"
        >
          {isSideBarOpen ? <X size={28} /> : <List size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out
        ${isSideBarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:w-64`}
      >
        <div className={`p-4 flex flex-col gap-y-4 ${isSideBarOpen? 'p-10': ""}`}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(item.path);
                setIsSideBarOpen(false); // auto-close sidebar on mobile after selection
              }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-500 cursor-pointer group"
            >
              <div className="text-amber-500 group-hover:text-black">{item.icon}</div>
              <h1 className="text-lg font-medium group-hover:text-black">
                {item.label}
              </h1>
            </div>
          ))}
          <div className="mt-4">
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};


 export default OwnerSideBar




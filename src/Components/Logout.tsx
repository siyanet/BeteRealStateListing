
import { LogOut } from "lucide-react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom"; 

const Logout = () => {
    const navigate = useNavigate(); 
    const handleLogout = async() =>{
       const refresh =  localStorage.getItem('bete_access_token');
       if (!refresh) {
        console.error("No refresh token found.");
        return;
      }

        try{
            const response = await axiosInstance.post('logout/',{refresh:refresh});
            if(response.status === 200){
                localStorage.removeItem('bete_access_token');
                localStorage.removeItem('bete_refresh_token');
                navigate('/signup');
            }
            

        }
        catch (error) {
            console.error("Error during logout", error);
          }
    }

  return (
    <div>
        <div className=" flex gap-4 justify-center items-center" onClick={handleLogout}>
        <div className="  text-amber-500 group-hover:text-black group-hover:text-xl"><LogOut/></div>
            
            <h1 className="text-lg font-medium group-hover:text-black group-hover:text-xl">LogOut</h1>
        </div>
      
    </div>
  )
}

export default Logout;

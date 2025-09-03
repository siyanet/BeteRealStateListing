import { MessageCircleIcon, Phone } from "lucide-react";
import { Agent } from "../Redux/agentSlice"
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

interface AgentCardProp {
    agent: Agent;
}

const AgentCard:React.FC<AgentCardProp> = ({agent}) => {
    const navigate = useNavigate();

    const handleChatClick = async () => {
        try {
          const response = await axiosInstance.post("/chat/get-or-create-room/", {
            agent_id: agent.id,
          });
          const roomId = response.data.room_id;
          navigate(`/chat/${roomId}`);
        } catch (error) {
          console.error("Error creating/getting chat room:", error);
        }
      };
  
  
    return (
    <div className="flex justify-between shadow p-2 md:p-5 font-lato items-center">
       <div className="flex gap-4">

       <div className="w-20 h-20 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src = {agent.profile_image} alt="Agent Profile Image"/>
        </div>
       <div className="flex flex-col  items-start ">
            <h1 className="font-bold">{agent.user.first_name} {agent.user.last_name}  </h1>
           
            <p className="text-gray-300">{agent.bio}</p>
            </div>

       </div>
      
        <div className="flex flex-col justify-between gap-5 items-end">
          
        <MessageCircleIcon onClick={handleChatClick} className="cursor-pointer hover:text-amber-500" />
           
            <div className="flex justify-end items-center">
                <Phone/>
                {agent.phone_number}
            </div>
        </div>
      
    </div>
  )
}

export default AgentCard

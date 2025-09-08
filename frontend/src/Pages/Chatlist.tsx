// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChatRoom } from "./AgentChatListPage";
// import axiosInstance from "../Components/axiosInstance";
// import OwnerComponent from "../Components/OwnerComponent";


// const OwnerChatlist: React.FC = () => {
//   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchChatRooms = async () => {
//       try {
//         const response = await axiosInstance.get<ChatRoom[]>("chatrooms/");
//         setChatRooms(response.data);
//       } catch (error) {
//         console.error("Failed to fetch chat rooms:", error);
//       }
//     };

//     fetchChatRooms();
//   }, []);

//   const handleRoomClick = (room: ChatRoom) => {
//     navigate(`/chat/${room.id}`, { state: { room } });
//   };

//   return (
//     <OwnerComponent>
//         <div className="min-h-screen  p-6">
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-amber-500">Chat Rooms</h2>

//         {chatRooms.length === 0 ? (
//           <div className="text-center text-gray-500 mt-10">No chat rooms found.</div>
//         ) : (
//           <ul className="space-y-4">
//             {chatRooms.map((room) => {
//               const sortedMessages = room.messages
//                 .slice()
//                 .sort(
//                   (a, b) =>
//                     new Date(b.timestamp).getTime() -
//                     new Date(a.timestamp).getTime()
//                 );
//               const lastMessage = sortedMessages[0];

//               return (
//                 <li
//                   key={room.id}
//                   onClick={() => handleRoomClick(room)}
//                   className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center justify-center rounded-full bg-amber-500 w-12 h-12 text-white text-lg font-semibold">
//                         {lastMessage?.sender_detail?.first_name?.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-semibold text-gray-800">
//                           {lastMessage?.sender_detail?.first_name || "Unknown"}
//                         </div>
//                         <div className="text-gray-600 text-sm mt-1 line-clamp-1">
//                           {lastMessage?.content || "No message content."}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-xs text-gray-400 whitespace-nowrap">
//                       {lastMessage
//                         ? new Date(lastMessage.timestamp).toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })
//                         : ""}
//                     </div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//     </OwnerComponent>
    
//   );
// };

// export default OwnerChatlist;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoom } from "./AgentChatListPage";
import axiosInstance from "../Components/axiosInstance";
import OwnerComponent from "../Components/OwnerComponent";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { fetchUser } from "../Redux/authUser";
import NavBar from "../Components/Naviagtion";
import Logout from "../Components/Logout";


const ChatList: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { role } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (role === null) {
      dispatch(fetchUser());
    }
  }, [dispatch, role]);
  
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axiosInstance.get<ChatRoom[]>("chatrooms/");
        setChatRooms(response.data);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, []);

  const handleRoomClick = (room: ChatRoom) => {
    navigate(`/chat/${room.id}`, { state: { room } });
  };

  const ChatListContent = (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-amber-500">Chat Rooms</h2>

        {chatRooms.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No chat rooms found.</div>
        ) : (
          <ul className="space-y-4">
            {chatRooms.map((room) => {
              const sortedMessages = room.messages
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
                );
              const lastMessage = sortedMessages[0];

              return (
                <li
                  key={room.id}
                  onClick={() => handleRoomClick(room)}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center rounded-full bg-amber-500 w-12 h-12 text-white text-lg font-semibold">
                        {lastMessage?.sender_detail?.first_name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          {lastMessage?.sender_detail?.first_name || "Unknown"}
                        </div>
                        <div className="text-gray-600 text-sm mt-1 line-clamp-1">
                          {lastMessage?.content || "No message content."}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 whitespace-nowrap">
                      {lastMessage
                        ? new Date(lastMessage.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );


  if (role === "owner") {
    return (
      <OwnerComponent>
        {ChatListContent}
      </OwnerComponent>
    );
  }

  if(role === 'agent'){
    return(
      <> <Logout/>{ChatListContent}</>
      
    )
  }

  return (
    <>
      <NavBar />
      {ChatListContent}
    </>
  );
};

export default ChatList;

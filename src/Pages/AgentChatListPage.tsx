import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Components/axiosInstance";

// Types
interface Message {
  id: number;
  room: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatRoom {
  id: number;
  agent: number;
  customer: string;
  created_at: string;
  messages: Message[];
}

const ChatRoomList: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const navigate = useNavigate();

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

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Chat Rooms</h2>
      {chatRooms.length === 0 ? (
        <p>No chat rooms found.</p>
      ) : (
        <ul className="space-y-4">
          {chatRooms.map((room) => {
            const latestMessage = room.messages
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime()
              )[0];

            return (
              <li
                key={room.id}
                onClick={() => handleRoomClick(room)}
                className="cursor-pointer p-4 border rounded-md hover:bg-gray-100 transition"
              >
                <div className="font-medium">
                  Room #{room.id} — Customer:{" "}
                  <span className="text-blue-600">{room.customer}</span>
                </div>
                <div className="text-sm text-gray-700">
                  {latestMessage ? (
                    <>
                      <span className="font-semibold">Last message:</span>{" "}
                      {latestMessage.content}
                      <br />
                      <span className="text-xs text-gray-500">
                        {new Date(latestMessage.timestamp).toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400 italic">
                      No messages yet.
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatRoomList;


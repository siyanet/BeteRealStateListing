import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Components/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/authUser";
import { AppDispatch, RootState } from "../Redux/store";
import LoadingSpinner from "../Components/loading";

type MessageType = {
  sender: string;
  content: string;
  timestamp: string;
};

const AgentCustomerChatPage = () => {
  const { id: roomId } = useParams(); // directly use roomId
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const socket = useRef<WebSocket | null>(null);
  
 
  
  const dispatch = useDispatch<AppDispatch>()
const user = useSelector((state: RootState) => state.user);

useEffect(() => {
  console.log("user dispatched");
  console.log(user.uuid);
    dispatch(fetchUser());
  
}, [dispatch, user.uuid]);
  console.log("userid: ")
  console.log(user);

  useEffect(() => {
    if (!roomId) return;

    axiosInstance
    .get(`/messages/?room_id=${roomId}`)
    .then((res) => {
      console.log("recived data: ");
      console.log(res.data);
      
      setMessages(res.data);
    })
    .catch((err) => console.error("Failed to fetch messages", err));
  


  }, [roomId]);


  useEffect(() => {
    if (!roomId) return;
    if (roomId && !socket.current) {
      const token = localStorage.getItem("bete_access_token");
      const ws = new WebSocket(`ws://${window.location.hostname}:8000/ws/chat/${roomId}/?token=${token}`);
      socket.current = ws;
    
    
    socket.current = ws;

    ws.onmessage = (event) => {
      console.log("Received WebSocket message:", event.data);
      try {
        const data = JSON.parse(event.data);
        console.log("Parsed message data:", data);
    
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            content: data.content,
            timestamp: data.timestamp,
          },
        ]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    ws.onerror = (event) =>{
      console.error("webSocket error",event)
    }

    ws.onclose = () => {
      console.log("WebSocket closed");
    };
    return () =>{
      if (socket.current) {
        socket.current.close();  // Close the WebSocket connection
        console.log("WebSocket connection closed on cleanup");
        socket.current = null;  // Clear the socket reference
      }
    }

    }

    

   
  }, [roomId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (socket.current && newMessage.trim() !== "") {
      socket.current.send(
        JSON.stringify({
          message: newMessage,
        })
      );
      setNewMessage("");

      console.log("message sented ");
    }
  };
  
  if (user.auth_user_status === "loading") {
    return <div><LoadingSpinner/></div>;
  }
  if(user.auth_user_error){
    return <div><p>{user.auth_user_error}</p></div>
  }
  
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <div className="h-96 overflow-y-scroll mb-4 border p-2 rounded bg-gray-50">
      {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded max-w-[75%] ${
              msg.sender === user.uuid
                ? "bg-blue-200 text-right ml-auto"
                : "bg-gray-300 text-left mr-auto"
            }`}
          >
            <p>{msg.content}</p>
            <small className="text-xs text-gray-600">{msg.timestamp}</small>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default AgentCustomerChatPage;

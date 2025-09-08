
// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../Components/axiosInstance";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUser } from "../Redux/authUser";
// import { AppDispatch, RootState } from "../Redux/store";
// import LoadingSpinner from "../Components/loading";
// import { User } from "../Redux/teamMember";

// type MessageType = {
//   sender: string;
//   sender_detail: User;
//   content: string;
//   timestamp: string;
// };

// const AgentCustomerChatPage = () => {
//   const { id: roomId } = useParams();
//   const [newMessage, setNewMessage] = useState("");
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const socket = useRef<WebSocket | null>(null);

//   const dispatch = useDispatch<AppDispatch>();
//   const user = useSelector((state: RootState) => state.user);

//   useEffect(() => {
//     dispatch(fetchUser());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!roomId) return;

//     axiosInstance
//       .get(`/messages/?room_id=${roomId}`)
//       .then((res) => setMessages(res.data))
//       .catch((err) => console.error("Failed to fetch messages", err));
//   }, [roomId]);

//   useEffect(() => {
//     if (!roomId || socket.current) return;

//     const token = localStorage.getItem("bete_access_token");
//     const ws = new WebSocket(`ws://${window.location.hostname}:8000/ws/chat/${roomId}/?token=${token}`);
//     socket.current = ws;

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         setMessages((prev) => [
//           ...prev,
//           {
//             sender: data.sender,
//             content: data.content,
//             timestamp: data.timestamp,
//             sender_detail: data.sender_detail,
//           },
//         ]);
//       } catch (error) {
//         console.error("Error parsing WebSocket message:", error);
//       }
//     };

//     ws.onerror = (event) => {
//       console.error("WebSocket error", event);
//     };

//     ws.onclose = () => {
//       console.log("WebSocket closed");
//     };

//     return () => {
//       socket.current?.close();
//       socket.current = null;
//     };
//   }, [roomId]);

//   const handleSend = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (socket.current && newMessage.trim()) {
//       socket.current.send(JSON.stringify({ message: newMessage }));
//       setNewMessage("");
//     }
//   };

//   if (user.auth_user_status === "loading") return <LoadingSpinner />;
//   if (user.auth_user_error) return <p>{user.auth_user_error}</p>;

//   return (
//     <div className="w-full h-screen flex flex-col p-4 justify-between bg-gray-50">
//       <div className="flex-1 overflow-y-auto mb-4 rounded-lg p-2 space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`max-w-[75%] p-2 ${
//               msg.sender === user.uuid ? "ml-auto text-right" : "mr-auto text-left"
//             }`}
//           >
//             <div className="bg-white shadow-md border border-gray-200 rounded-lg px-4 py-2">
//               <p className="text-amber-500 font-semibold">{msg.sender_detail.first_name}</p>
//               <p className="text-gray-800">{msg.content}</p>
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//   {new Date(msg.timestamp).toLocaleString("en-US", {
//     dateStyle: "medium",
//     timeStyle: "short",
//   })}
// </p>

//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSend} className="flex items-center gap-2 mt-auto">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//         />
//         <button
//           type="submit"
//           className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-md transition duration-200"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AgentCustomerChatPage;




import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Components/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/authUser";
import { AppDispatch, RootState } from "../Redux/store";
import LoadingSpinner from "../Components/loading";
import { User } from "../Redux/teamMember";
import OwnerComponent from "../Components/OwnerComponent"; // Import your OwnerComponent
import { ArrowLeft } from "lucide-react";

type MessageType = {
  sender: string;
  sender_detail: User;
  content: string;
  timestamp: string;
};

const AgentCustomerChatPage = () => {
  const { id: roomId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const socket = useRef<WebSocket | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  
  const handleBack = () => {
    navigate(-1); // navigate back
  };

  useEffect(() => {
    if (!roomId) return;

    axiosInstance
      .get(`/messages/?room_id=${roomId}`)
      .then((res) => setMessages(res.data as MessageType[]))
      .catch((err) => console.error("Failed to fetch messages", err));
  }, [roomId]);

  useEffect(() => {
    if (!roomId || socket.current) return;

    const token = localStorage.getItem("bete_access_token");
    const ws = new WebSocket(`ws://${window.location.hostname}:8000/ws/chat/${roomId}/?token=${token}`);
    socket.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            content: data.content,
            timestamp: data.timestamp,
            sender_detail: data.sender_detail,
          },
        ]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error", event);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      socket.current?.close();
      socket.current = null;
    };
  }, [roomId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket.current && newMessage.trim()) {
      socket.current.send(JSON.stringify({ message: newMessage }));
      setNewMessage("");
    }
  };

  if (user.auth_user_status === "loading") return <LoadingSpinner />;
  if (user.auth_user_error) return <p>{user.auth_user_error}</p>;

  const chatContent = (
    <div className="w-full h-screen flex flex-col p-4 justify-between ">
      <div className="flex items-center mb-4">
        <button onClick={handleBack} className="mr-4 text-amber-500 hover:text-amber-700">
          <ArrowLeft/>
        </button>
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto mb-4 rounded-lg p-2 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] p-2 ${
              msg.sender === user.uuid ? "ml-auto text-right" : "mr-auto text-left"
            }`}
          >
            <div className="bg-white shadow-md border border-gray-200 rounded-lg px-4 py-2">
              <p className="text-amber-500 font-semibold">{msg.sender_detail.first_name}</p>
              <p className="text-gray-800">{msg.content}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(msg.timestamp).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Render form ONLY if the user is NOT Owner */}
      {user.role !== "Owner" && (
        <form onSubmit={handleSend} className="flex items-center gap-2 mt-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-md transition duration-200"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );

  // If user is Owner, wrap the chatContent with OwnerComponent
  return user.role === "Owner" ? (
    <OwnerComponent>{chatContent}</OwnerComponent>
  ) : (
    chatContent
  );
};

export default AgentCustomerChatPage;
















{/* <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
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
</div> */}
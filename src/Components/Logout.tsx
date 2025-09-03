import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import axiosInstance from "./axiosInstance";
import { createPortal } from "react-dom";
import OverlayComponent from "./OverlayComponent";

const Logout = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refresh = localStorage.getItem("bete_refresh_token");
    if (!refresh) {
      console.error("No refresh token found.");
      return;
    }

    try {
      const response = await axiosInstance.post("logout/", { refresh });
      if (response.status === 200) {
        localStorage.removeItem("bete_access_token");
        localStorage.removeItem("bete_refresh_token");
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const modalContent = (
    <div className="fixed inset-0  bg-black/50  bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl w-80">
        <h2 className="text-lg font-semibold mb-6 text-center text-gray-800">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-between gap-4">
          <button
            onClick={handleLogout}
            className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className="flex gap-4 justify-center items-center cursor-pointer group"
        onClick={() => setShowModal(true)}
      >
        <div className="text-amber-500 group-hover:text-black group-hover:text-xl">
          <LogOut />
        </div>
        <h1 className="text-lg font-medium group-hover:text-black group-hover:text-xl">
          LogOut
        </h1>
      </div>

      {/* Portal for modal */}
      {showModal && createPortal(modalContent, document.body)}
    </>
  );
};

export default Logout;

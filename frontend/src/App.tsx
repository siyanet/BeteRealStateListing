import LandingPage from "./Pages/LandingPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider} from "react-redux";
import '@fontsource/lato/300.css'; // Light
import '@fontsource/lato/700.css'; // Bold
import SignUpPage from "./Pages/SignUpPage";
import { ToastContainer } from "react-toastify";
import OwnerDashboard from "./Pages/OwnerDashboard";
import OwnerProperty from "./Pages/OwnerProperty";
import NotFoundPage from "./Pages/NotFoundPage";
import ForbiddenPage from "./Pages/ForbiddenPage";
import { store} from "./Redux/store";
import ProtectedRoute from "./Components/ProtectedRoute";
// import { PersistGate } from "redux-persist/integration/react";
import RolePage from "./Pages/RolePage";
import TeamMemberPage from "./Pages/TeamMember";
import AgentsPage from "./Pages/AgentsPage";
import AddPropertyPage from "./Pages/AddPropertyPage";
import PropertyListingPage from "./Pages/PropertyListingPage";
import PropertyDetailsPageForCustomer from "./Pages/PropertyDetailsPageForCustomer";
import AgentCustomerChatPage from "./Pages/AgentCustomerChatPage";
import ChatRoomList from "./Pages/AgentChatListPage";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import OwnerReviewView from "./Pages/OwnerReviewView";

import OwnerProfile from "./Pages/OwnerProfile";
import ChatList from "./Pages/Chatlist";


function App() {
 


  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router>
    <ToastContainer 
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage isOwner={false} />} />
      <Route path="/signupasRealStateOwner" element={<SignUpPage isOwner />} />
      <Route path="/owner-dashboard" element={<ProtectedRoute allowedRoles={['Owner']}><OwnerDashboard/></ProtectedRoute>} />
      <Route path='/owner-property' element={<OwnerProperty/>}/>
      <Route path="/403" element={<ForbiddenPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
      <Route path="/role" element={<RolePage/>}/>
      <Route path='/team_member' element = {<TeamMemberPage/>}/>
      <Route path="/agents" element = {<AgentsPage/>}/>
      <Route path = "/add_property" element={<AddPropertyPage/>}/>
      <Route path = "/property_lists" element= {<PropertyListingPage/>}/>
      <Route path="/property/:id" element={<PropertyDetailsPageForCustomer />} />
      <Route path="/chat/:id" element={<AgentCustomerChatPage />} />
      <Route path="/chat/list" element = {<ChatRoomList/>}/>
      <Route path="/aboutus" element = {<AboutUsPage/>}/>
      <Route path = "/contactus" element = {<ContactUsPage/>}/>
      <Route path = '/review' element = {<OwnerReviewView/>}/>
      <Route path = '/chatlist' element = {<ChatList/>}/>
      <Route path = '/owner_profile' element = {<OwnerProfile/>}/>
    </Routes>
  </Router>
      {/* </PersistGate> */}
    
  </Provider>
  )
}

export default App

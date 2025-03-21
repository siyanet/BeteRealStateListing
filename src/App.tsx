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
import { store,persistor } from "./Redux/store";
import ProtectedRoute from "./Components/ProtectedRoute";
import { PersistGate } from "redux-persist/integration/react";
import RolePage from "./Pages/RolePage";


function App() {
 


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/owner-dashboard" element={<ProtectedRoute allowedRoles={['Owner']}><OwnerDashboard/></ProtectedRoute>} />
      <Route path='/owner-property' element={<OwnerProperty/>}/>
      <Route path="/403" element={<ForbiddenPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
      <Route path="/role" element={<RolePage/>}/>
    </Routes>
  </Router>
      </PersistGate>
    
  </Provider>
  )
}

export default App

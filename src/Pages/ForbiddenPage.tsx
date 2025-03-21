import { Link } from "react-router-dom";

const ForbiddenPage = () => {
    return (
      <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
          <div className="flex flex-col gap-6 rounded p-10 justify-center bg-white items-center text-center shadow-2xl">
              <h1 className="font-bold font-lato text-2xl ">403 </h1>
              <h1 className="font-bold font-lato text-2xl gradient-text">You are not allowed to access this page.</h1>
              <Link to="/" className="p-2 bg-amber-500 text-white rounded">Go Home</Link>
  
          </div>
        
      </div>
    )
  }
  
  export default ForbiddenPage;
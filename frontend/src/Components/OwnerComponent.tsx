import { ReactNode } from "react";
import OwnerHeader from "./OwnerHeader";
import OwnerSideBar from "./OwnerSideBar";

interface OwnerComponentProps {
    children: ReactNode;
  }
  const OwnerComponent:React.FC<OwnerComponentProps> = ({children}) => {
    return (
      <div className="w-screen h-screen ">
        <OwnerHeader/>
        <div className="flex pt-10 gap-2 pr-3 md:pt-15 relative ">
          <OwnerSideBar/>
          <div className="flex-1 px-2 overflow-y-auto">{children}</div>
  
        </div>
          
        
      </div>
    )
  }
  
  export default OwnerComponent
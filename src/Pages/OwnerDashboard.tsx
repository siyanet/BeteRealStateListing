
import { ReactNode } from "react";
import OwnerComponent from "../Components/OwnerComponent"
import { Building, Star, User, View } from "lucide-react";
interface InfoProps  {
  number: string;
  word: string;
  icon: ReactNode;
}
const Info:React.FC<InfoProps>=({number,word,icon})=>{
  return(
    <div className="shadow-xl rounded-xl p-3  md:flex">
      <div className="p-2  rounded-full bg-amber-200 flex items-center justify-center">{icon}</div>
    <div className="text-center font-lato font-bold text-md md:text-xl">
      <p>{number}</p>
      <p>{word}</p>
      </div>
      </div>

  )

}
const OwnerDashboard = () => {
  return (
    <div className="w-full h-full">
      <OwnerComponent>
        <div>
          <div className="flex flex-wrap gap-2 justify-start items-center">
            <Info number="50" word="Total Listing" icon={<Building/>}/>
            <Info number="50" word = "Total Views" icon = {<View/>}/>
            <Info number="50" word=" Total Contact Requests " icon ={<User/>}/>
            <Info number="50" word = "Total Reviews" icon = {<Star/>}/>

          </div>

        </div>
      </OwnerComponent>
      
    </div>
  )
}

export default OwnerDashboard


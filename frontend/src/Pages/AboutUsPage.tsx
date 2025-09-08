import { ThumbsUp } from "lucide-react"
import NavBar from "../Components/Naviagtion"
import Footer from "../Components/Footer"
import ListYourProperty from "../Components/ListYourProperty"
import MiddelSection from "../Components/MiddelSection"


const AboutUsPage:React.FC = () => {
  return (
    <div>
        <NavBar/>
        
        <div className="pt-20 px-2 font-lato flex flex-col gap-3">
            <h1 className=" gradient-text font-lato font-bold text-center">About Us</h1>
            <p className="text-center">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat </p>
            <div className="flex justify-between items-center" >
                <div>
                    <div className="flex">
                        <ThumbsUp className="text-amber-500"/>
                        <h1>Certified Company</h1>
                    </div>
                    <div>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula e</p>
                    </div>
                </div>


                <div>
                    <div className="flex">
                        <ThumbsUp className="text-amber-500"/>
                        <h1>Certified Company</h1>
                    </div>
                    <div>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula e</p>
                    </div>
                </div>


                <div>
                    <div className="flex">
                        <ThumbsUp className="text-amber-500"/>
                        <h1>Certified Company</h1>
                    </div>
                    <div>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula e</p>
                    </div>
                </div>



         

             
            </div>
            <div className="w-full">
                <img src = "/agree1.png" alt="Agree"/>

            </div>
            <p className="text-center">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat </p>

        </div>
        <ListYourProperty/>
        <MiddelSection/>
        <Footer/>
      
    </div>
  )
}

export default AboutUsPage

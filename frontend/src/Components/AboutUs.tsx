import {  Medal, Ribbon } from "lucide-react"


const AboutUs = () => {
  return (
    <div className="flex flex-col p-5  justify-between items-center">
        <h1 className="font-lato font-bold text-2xl py-7 gradient-text p-2">About Us</h1>
        
            <div className="flex justify-between items-center">
                <div className="w-1/2 h-80 hidden md:block ">
                    <img src = "/agree1.png" alt="agree" className="object-cover rounded w-full h-full"/>
                </div>

                <div className="flex justify-between  w-full md:w-1/2  flex-col items-center p-2 gap-10">
                <div className="flex justify-center items-center flex-col gap-3">
                    <h1 className="gradient-text font-bold font-lato ">Who We Are</h1>
                    <p className="font-lato text-center text-black">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat </p>
                </div>
                <div className="flex justify-between gap-2  items-center">
                    <div>
                        <div className="flex justify-center items-center">
                        <Ribbon className="w-16 text-amber-500"/>
                        <h1 className="text-center"> Certified Company</h1>

                        </div>
                       
                        <p className="font-lato text-gray-400  text-center">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula e</p>
                        
                    </div>
                    <div>
                        <div className="flex justify-center items-center">
                        <Medal className="w-16 text-amber-500"/>
                        <h1 className="text-center "> Certified Company</h1>

                        </div>
     
                        <p className=" text-center font-lato text-gray-400 ">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula e</p>
                        
                    </div>

                </div>
                </div>


               
               
            </div>

        
      
    </div>
  )
}

export default AboutUs

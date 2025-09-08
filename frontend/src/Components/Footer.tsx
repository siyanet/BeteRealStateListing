import { FacebookIcon, InstagramIcon, LinkedinIcon, Mail, MapPin, Phone, TwitterIcon } from "lucide-react"


const Footer = () => {
  return (
    <div className="font-lato ">
      <div className="bg-amber-400 p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center w-full h-full flex-col md:flex-row gap-3 ">
        <div className="flex flex-col  gap-2 ">
          <FacebookIcon/>
          <InstagramIcon/>
          <TwitterIcon/>
          <LinkedinIcon/>

        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="">About Us</h1>
          <p className="text-center">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat 
          </p>

        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex justify-center gap-1">
            <Phone/>
            <p>251043989437</p>
            </div>
            <div className="flex justify-center gap-1">
            <Mail/>
   
            <p>Bete@gmail.com</p>
            </div>
            <div className="flex justify-center gap-1">
            <MapPin/>
        
            <p>AddisAbaba,Megengna 22</p>
            </div>
           
        
          
          
        
         

        </div>
      
    </div>

    <div className="flex w-full h-full justify-between items-center flex-col-reverse gap-2 md:flex-row">
        <h1>BETE</h1>
        <div className="flex font-bold  justify-between items-center gap-4">
<p >Home</p>
<p>Property</p>
<p>Contact Us</p>
<p>About Us</p>
        </div>

    </div>
      </div>
         
   
    <div className="bg-white flex justify-center items-center">
        <p>@CopyRight All Rights Reserved</p>

    </div>

    </div>
   
  )
}

export default Footer

import { FacebookIcon, InstagramIcon, LinkedinIcon,  Mail, MapPin, Phone, TwitterIcon } from "lucide-react";



const UpperHeader:React.FC = () => {
  return (
    <div className="fixed w-full  bg-yellow-500 z-50   text-black text-sm md:text-lg">
        <div className="flex justify-between p-2">
            <div className="flex gap-4">
                <div className="flex "><Phone/> <p>251934543456</p></div>
                <div className="flex "><Mail/> <p>Bete@example.com</p></div>
                <div className="flex "><MapPin/> <p>AddisAbaba,Megenagna</p></div>
            </div>
            <div className="flex gap-4">
                <FacebookIcon/>
                <InstagramIcon/>
                <TwitterIcon/>
                <LinkedinIcon/>
                
            </div>
        </div>
      
    </div>
  )
}

export default UpperHeader;

import { motion } from "framer-motion";
import Button from "./Button";
// import { useState, useEffect } from "react";

// const images = [
//   "https://images.search.yahoo.com/images/view;_ylt=AwrFRzQW19FnUQwGrkeJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2Q0NWFkMzJlODE4MGE2M2VkOWVlNDc4OTVlNThmY2JmBGdwb3MDMTIEaXQDYmluZw--?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dreal%2Bstate%2Bhome%2Bimage%26ei%3DUTF-8%26type%3DE210US91213G0%26fr%3Dmcafee%26fr2%3Dp%253As%252Cv%253Ai%252Cm%253Asb-top%26tab%3Dorganic%26ri%3D12&w=2880&h=1920&imgurl=iranwatsonphoto.com%2Fwp-content%2Fuploads%2F2011%2F10%2F200-Estoria-St-Exterior-Twilight-Front.jpg&rurl=http%3A%2F%2Factiverain.com%2Fblogsview%2F2580959%2Fatlanta-real-estate-and-photography-home-for-sale-in-inman-park-cabbagetown&size=3936KB&p=real+state+home+image&oid=d45ad32e8180a63ed9ee47895e58fcbf&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&fr=mcafee&tt=Atlanta+Real+Estate+and+Photography+-+Home+for+Sale+in+Inman+Park+...&b=0&ni=80&no=12&ts=&tab=organic&sigr=IhHNheCzA57M&sigb=1GmC6_CBB5O4&sigi=mTDsh70wDUcl&sigt=xc_1NgaZ5.Pk&.crumb=eaMKVYOabkA&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&type=E210US91213G0",
//   "https://images.search.yahoo.com/images/view;_ylt=AwrFRzQW19FnUQwGqkeJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzMwZjc1NDg0NmRjY2JlMmZlZWMzZTU0YmVhMzcwZDUxBGdwb3MDOARpdANiaW5n?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dreal%2Bstate%2Bhome%2Bimage%26ei%3DUTF-8%26type%3DE210US91213G0%26fr%3Dmcafee%26fr2%3Dp%253As%252Cv%253Ai%252Cm%253Asb-top%26tab%3Dorganic%26ri%3D8&w=1920&h=1280&imgurl=luxuryontario.ca%2Fwp-content%2Fuploads%2F2021%2F01%2FExterior-of-334-Balsam-Drive-Georgian-style-Oakville-real-estate.jpg&rurl=https%3A%2F%2Fluxuryontario.ca%2Freal-estate%2F&size=217KB&p=real+state+home+image&oid=30f754846dccbe2feec3e54bea370d51&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&fr=mcafee&tt=Luxury+Ontario+Real+Estate%3A+Luxury+Homes+for+Sale+in+Ontario+Canada&b=0&ni=80&no=8&ts=&tab=organic&sigr=z27RLVLNMSW9&sigb=6IhGOAFgQDGi&sigi=RCHKbZo.cH3k&sigt=8ZC.pQYXzO6p&.crumb=eaMKVYOabkA&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&type=E210US91213G0",
//   "https://tse1.mm.bing.net/th?id=OIP.LSs5kD0p97TesrxUfL464AHaEN&pid=Api&P=0&h=220",
//   "https://images.search.yahoo.com/images/view;_ylt=AwrFRzQW19FnUQwGpUeJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzVlZTlkNTk1ZDgwMTY1YjQ2ZDY0OTc0M2FkOGYyZTgwBGdwb3MDMwRpdANiaW5n?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dreal%2Bstate%2Bhome%2Bimage%26ei%3DUTF-8%26type%3DE210US91213G0%26fr%3Dmcafee%26fr2%3Dp%253As%252Cv%253Ai%252Cm%253Asb-top%26tab%3Dorganic%26ri%3D3&w=1760&h=1000&imgurl=media.salecore.com%2Fsalesaspects%2Fshared%2FGlobalImageLibrary%2FRealEstate%2FFullScreen%2FLuxury%2Fluxury-real-estate-homes-for-sale-21-1760-1000.jpg&rurl=https%3A%2F%2Ffoothillrealestate.net%2F&size=665KB&p=real+state+home+image&oid=5ee9d595d80165b46d649743ad8f2e80&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&fr=mcafee&tt=Search+Homes+for+Sale+with+Foothill+Real+Estate&b=0&ni=80&no=3&ts=&tab=organic&sigr=ZCuLAQo396TB&sigb=YfXRzinPwiwG&sigi=BS6lD68w2zTO&sigt=0Te66bBlC3uu&.crumb=eaMKVYOabkA&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&type=E210US91213G0",
// ];
const Header: React.FC = () => {
    const text = "Welcome To Bete"; 
    // const [index, setIndex] = useState(0);

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle images
    //   }, 3000); // Change every 3 seconds
  
    //   return () => clearInterval(interval); // Cleanup on unmount
    // }, []);
  return (
    <div className="relative w-full h-screen">
      {/* Triangle Section */}
      <div className="absolute  top-0 left-0 w-1/2 h-full  bg-white flex items-center p-3 clip-triangle">
     <div className="flex flex-col">
     <motion.h1
        className="text-2xl font-lato font-bold gradient-text"
        
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <p className="font-lato">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede</p>
     <Button className="font-lato text-black h-10 rounded font-bold mt-2 w-25 bg-amber-400">
        See Listing
     </Button> 
     </div>
        
      </div>

      {/* Image Section (Fills remaining space) */}
      <div
        className="w-full h-full bg-red-500 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/random/800x600')",
        }}
      ></div>

{/* <div className="w-full h-full  bg-cover bg-center">
        <motion.div
          key={index} // This forces re-render on image change
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // 1-second fade transition
        ></motion.div>
      </div> */}
    </div>
  );
};

export default Header;


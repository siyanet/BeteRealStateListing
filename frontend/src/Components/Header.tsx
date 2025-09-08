import { motion } from "framer-motion";
import Button from "./Button";
import { useState, useEffect } from "react";

const images = [
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg"
];

const Header: React.FC = () => {
  const text = "Welcome To Bete"; 
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${images[index]})` }}
      ></div>

      {/* Triangle + Content */}
      <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 md:transform-none 
                      w-full md:w-1/2 h-auto  
                      flex items-center justify-center 
                      px-4 py-4
                      bg-black/50  
                      md:clip-triangle">
        
        <div className="max-w-md text-white py-4 md:text-black text-center">
          {/* Animated Heading */}
          <motion.h1
            className="text-2xl font-lato font-bold gradient-text mb-4"
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

          {/* Description */}
          <p className="font-lato mb-4 text-sm text-white md:text-base">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor...
          </p>

          {/* Button */}
          <Button className="font-lato text-black h-10 rounded font-bold w-32 bg-amber-400">
            See Listing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;




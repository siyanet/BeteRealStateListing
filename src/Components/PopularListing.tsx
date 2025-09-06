
import Button from "./Button"
import PropertyCard from "./PropertyCard";

import { useEffect, useState } from "react";

import { Property } from "../Redux/PropertySlice";
import axiosInstance from "./axiosInstance";
import LoadingSpinner from "./loading";




const PopularListing:React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
   useEffect(() => {
    const fetchPopularListings = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<Property[]>(
          "property/latest/"
        );
        setProperties(response.data);
      } catch (err) {
        console.log(err)
        setError("Failed to load latest listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularListings();
  }, []);
  return (
    <div className="w-full  h-full flex items-center p-5 flex-col gap-5 justify-center">
        <h1 className="font-lato font-bold text-2xl gradient-text ">Latest Listings</h1>
 
   {loading && <LoadingSpinner/>}
   {error && <div className="w-full flex justify-center items-center"><p className="text-red-500 font-lato">{error}</p></div>}


   <div className="flex flex-wrap justify-center gap-5 md:justify-between w-full items-center space-x-4">
    {properties.map((property,index) =>(
        <PropertyCard key={index} property={property} isList={false}/>
    ))}

   </div>
   <Button>See More</Button>




      
    </div>
  )
}

export default PopularListing

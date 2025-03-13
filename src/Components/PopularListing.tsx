import Button from "./Button"
import PropertyCard from "./PropertyCard";


const PopularListing:React.FC = () => {
    const properties = [
        {
          
          price: "12000000000",
          location: "Addis Ababa, Ethiopia",
          name: "Luxury Villa",
          bedrooms: 5,
          bathrooms: 4,
          kitchens: 2
        },
        {
          
          price: "8000000000",
          location: "Mekelle, Ethiopia",
          name: "Modern Apartment",
          bedrooms: 3,
          bathrooms: 2,
          kitchens: 1
        },
        {
          
          price: "5000000000",
          location: "Hawassa, Ethiopia",
          name: "Beautiful Villa",
          bedrooms: 4,
          bathrooms: 3,
          kitchens: 2
        }
      ];
  return (
    <div className="w-full  h-full flex items-center mt-10 flex-col justify-center">
        <h1 className="font-lato font-bold gradient-text ">Popular Listings</h1>
   <Button>View</Button>
   <div className="flex justify-between items-center space-x-4 p-8">
    {properties.map((property,index) =>(
        <PropertyCard key={index} property={property}/>
    ))}

   </div>
   <div className="flex justify-between items-center w-full h-full">
    <Button>Previous</Button>
    <Button>Next</Button>
   </div>
      
    </div>
  )
}

export default PopularListing

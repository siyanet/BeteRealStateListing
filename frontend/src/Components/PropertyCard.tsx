import { Bath, Bed, UtensilsCrossed } from "lucide-react";
import { Property } from "../Redux/PropertySlice";

interface PropertyCardProps {
  property: Property;
  isList: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property ,isList= false}) => {
  return (
    <div
      className={`w-full max-w-[500px] h-full flex ${
        isList ? 'flex-row' : 'flex-col'
      } rounded shadow overflow-hidden bg-white`}
    >
      {/* Image Section */}
      <div className="h-48 w-full">
        <img
          src={property.images[0]?.image}
          alt="Property"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-2 p-4 flex-grow">
        <p className="font-lato font-bold text-amber-500 text-lg">
          {property.price} ETB
        </p>
        <p className="font-lato text-gray-500 flex items-center gap-1">
          <i className="fas fa-map-marker-alt text-red-500" />
          {property.location}
        </p>
        <h2 className="font-lato font-bold text-black text-xl">{property.title}</h2>

        <div className="flex  justify-between  text-gray-400 mt-2 font-lato">
          <div className="flex gap-1 "><Bed/> <p>{property.bedrooms} Bedrooms</p></div>
          <div className="flex gap-1 "><Bath/> <p>{property.bedrooms} Bathrooms</p></div>
          <div className="flex gap-1 "><UtensilsCrossed/> <p>{property.bedrooms} Kitchen</p></div>
          
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;


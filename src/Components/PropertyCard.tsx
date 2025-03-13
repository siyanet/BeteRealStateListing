
interface PropertyCardProps {
    property: {
        price: string;
        location: string;
        name: string;
        bedrooms: number;
        bathrooms: number;
        kitchens: number;
      
    }
   
}

const PropertyCard:React.FC<PropertyCardProps> = ({property}) => {
  return (
    <div className="w-full h-full flex flex-col">
        <div>
            <img src="image.png" alt="property image" className="rounded-t"/>
        </div>
        <div>
            <p className="font-lato font-bold text-amber-500">{property.price} ETB</p>
            <p className=" font-lato text-gray-400"><i className="fas fa-map-marker"/>{property.location}</p>
            <h1 className="font-bold font-lato text-black">{property.name}</h1>
            <div className="flex  font-lato text-black justify-between items-center">
                <p>{property.bedrooms} Bedrooms</p>
                <p>{property.bathrooms}Bathroom</p>
                <p>{property.kitchens} Kitchen</p>

            </div>
            
        </div>
      
    </div>
  )
}

export default PropertyCard

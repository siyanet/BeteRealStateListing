import { Property } from "../Redux/PropertySlice"

interface PropertyCardProps {
    property: Property
   
}

const PropertyCard:React.FC<PropertyCardProps> = ({property}) => {
  console.log(property.images);
    return (
    <div className="w-full h-full flex flex-col">
        <div>
            <img src={property.images[0]?.image} alt="property image" className="rounded-t"/>
        </div>
        <div>
            <p className="font-lato font-bold text-amber-500">{property.price} ETB</p>
            <p className=" font-lato text-gray-400"><i className="fas fa-map-marker"/>{property.location}</p>
            <h1 className="font-bold font-lato text-black">{property.title}</h1>
            <div className="flex  font-lato text-black justify-between items-center">
                <p>{property.bedrooms} Bedrooms</p>
                <p>{property.bathrooms}Bathroom</p>
                <p>{property.kitchen} Kitchen</p>

            </div>
            
        </div>
      
    </div>
  )
}

export default PropertyCard

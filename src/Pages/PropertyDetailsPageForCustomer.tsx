import React, { useEffect, useState } from 'react'
import { Property } from '../Redux/PropertySlice'
import UpperHeader from '../Components/UpperHeader';
import NavBar from '../Components/Naviagtion';
import AgentCard from '../Components/AgentCard';
import { Agent } from '../Redux/agentSlice';
import { LocateIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Components/axiosInstance';

const PropertyDetailsPageForCustomer:React.FC= () => {
    const { id } = useParams(); // Get ID from URL
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchProperty = async () => {
          try {
            const response = await axiosInstance.get(`property/${id}/`);
            console.log(response.data);
            setProperty(response.data as Property) ;
          } catch (error) {
            console.log(error);
            console.error("Error fetching property", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProperty();
      }, [id]);
      if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!property) return <div className="text-center p-10">Property not found.</div>;

    return (
    <div className='font-lato'>
        <UpperHeader></UpperHeader>
        <div className='pt-10'><NavBar/></div>
        <div className='pt-13 px-2'>
<div  className='flex w-full justify-between pb-5 items-center'>
    <h1 className='font-bold text-2xl'>{property.owner_detail.business_name}</h1>
    <p className='text-2xl text-orange-400'>{property.price}</p>
</div>
<div className='flex justify-between'>
    <div>
        <img src = {property.images[0].image} alt="Property Image"/>
      </div>
      <div className='h-full flex flex-col gap-10  items-center justify-between'>
      {property.agents_detail.map((agent:Agent) =>(
        <div className='' key = {agent.id}>
             <AgentCard key={agent.id} agent={agent}/>
            </div>
           
        ))}

      </div>
      
    
   
</div>

<div>
    <p className='text-center'>{property.description}</p>
    <div className='flex justify-between items-center'>
        <div className='text-gray-300'>
            <LocateIcon/>
            <p >{property.location}</p>
        </div>
        <div className='flex justify-between items-centerg'>
            <p>{property.bedrooms}Bedrooms</p>
            <p>{property.bathrooms}Bathrooms</p>
            <p>{property.kitchen} Kitchens</p>
        </div>
    </div>
</div>

        </div>
      
    </div>
  )
}

export default PropertyDetailsPageForCustomer

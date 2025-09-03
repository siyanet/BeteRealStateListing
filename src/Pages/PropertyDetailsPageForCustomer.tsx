import React, { useEffect, useState } from 'react'
import { Property } from '../Redux/PropertySlice'
import NavBar from '../Components/Naviagtion';
import AgentCard from '../Components/AgentCard';
import { Agent } from '../Redux/agentSlice';
import { Bath, Bed, MapPin, UtensilsCrossed } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Components/axiosInstance';
import MiddelSection from '../Components/MiddelSection';
import Footer from '../Components/Footer';
import ReviewCard from '../Components/ReviewCard';
import { fetchReviewsByProperty, Review } from '../Redux/ReviewSlice';
import LoadingSpinner from '../Components/loading';
import { AppDispatch, RootState } from '../Redux/store';
import { useDispatch, useSelector } from 'react-redux';

const PropertyDetailsPageForCustomer:React.FC= () => {
    const { id } = useParams(); // Get ID from URL
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const { reviews, review_status } = useSelector((state: RootState) => state.reviews);
  
    
    useEffect(() => {
        const fetchProperty = async () => {
          try {
            const response = await axiosInstance.get(`property/${id}/`);
            console.log(response.data);
            setProperty(response.data as Property) ;
            if (id) {
              dispatch(fetchReviewsByProperty(Number(id))); // use your thunk
            }         
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
       <NavBar/>
       <div className='px-2'>
        <div className='pt-17 '>
<div  className='flex w-full justify-between pb-5 items-center'>
    <h1 className='font-bold text-2xl'>{property.owner_detail.business_name}</h1>
    <p className='text-2xl text-orange-400'>{property.price}</p>
</div>
<div className='flex flex-col gap-6 md:flex-row justify-between'>
 
 {/* Property Section */}
  <div className='flex flex-col md:w-2/3'>

  <div>
        <img src = {property.images[0].image} alt="Property Image"/>
      </div>

{/* 
      description */}
  <div className='font-lato p-5 flex flex-col gap-4  '>
    <p className=' font-bold'>{property.description}</p>
    <div className='flex justify-between items-center text-gray-400'>
        <div className=' flex'>
            <MapPin/>
            <p >{property.location}</p>
        </div>
        <div className='flex justify-between items-center gap-3'>
        <div className="flex gap-1 "><Bed/> <p>{property.bedrooms} Bedrooms</p></div>
          <div className="flex gap-1 "><Bath/> <p>{property.bedrooms} Bathrooms</p></div>
          <div className="flex gap-1 "><UtensilsCrossed/> <p>{property.bedrooms} Kitchen</p></div>
          
          
       
        </div>
    </div>
</div>
  </div>
   

   {/* Agents Section */}
      <div className='h-full flex flex-col gap-10  items-center justify-between w-full'>
      {property.agents_detail.map((agent:Agent) =>(
        <div className='w-full' key = {agent.id}>
             <AgentCard key={agent.id} agent={agent}/>
            </div>
           
        ))}

      </div>
      
    
   
</div>



        </div>

        <div className='my-8'>
  <h2 className='text-xl font-bold mb-4'>Customer Reviews</h2>
  
  {review_status === "review_loading" && <LoadingSpinner/>}
  {review_status === "review_failed" && <p className='text-red-500'>Failed to load reviews.</p>}
  {review_status === "review_succeeded" && reviews.length === 0 && <p>No reviews yet.</p>}

  <div className='grid gap-4 px-2'>
    {reviews.map((review:Review) => (
      <ReviewCard
        key={review.uuid}
        word={review.comment}
        number={review.rating}
        name={review.customer_name}
      />
    ))}
  </div>
</div>
</div>


        <MiddelSection/>
        <Footer/>


        
      
    </div>
  )
}

export default PropertyDetailsPageForCustomer

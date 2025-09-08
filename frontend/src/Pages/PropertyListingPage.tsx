import {  Grid, List,  SkipBack, SkipForward } from "lucide-react"
import styled from "styled-components"
import PropertyCard from "../Components/PropertyCard"
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../Redux/store";
import { fetchProperties } from "../Redux/PropertySlice";
import LoadingSpinner from "../Components/loading";
import Naviagtion from "../Components/Naviagtion";
import { debounce } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import MiddelSection from "../Components/MiddelSection";

export const SearchInputField = styled.input`
  width: 100%;
  max-width: 230px;
  padding: 10px 16px;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #f1ec63;
    box-shadow: 0 0 0 4px rgba(241, 217, 99, 0.2);
    outline: none;
    background-color: #fff;
  }

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }

  &:hover {
    border-color: #f4e06c;
  }
  @media (max-width: 768px) {
    max-width: 120px;
    font-size: 15px;
    padding: 8px 14px;

  }

  @media (max-width: 480px) {
    font-size: 9px;
    padding: 7px 12px;
    max-width: 70px;
  }
`;

const PropertyListingPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { properties, properties_status,properties_error } = useSelector((state: RootState) => state.properties);
    const [isList,setIsList] = useState(false);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [page, setPage] = useState(1);

    const debouncedSearch = useCallback(
      debounce((query) => {
        const queryParams = {
          search: query.search,
          filters: {
            location: query.location,
            price: query.minPrice ? parseFloat(query.minPrice) : undefined,
          },
          page,
        };
        dispatch(fetchProperties(queryParams));
      }, 1000), // debounce for 1 second
      [dispatch, page]
    );
  
    useEffect(() => {
      // Trigger the debounced search whenever the search term, location, or minPrice changes
      debouncedSearch({ search, location, minPrice });
    }, [search, location, minPrice, debouncedSearch]);
  
    return (
    <div className="font-lato ">
    
      <div className=""></div>
      <Naviagtion/>
      <div className="flex pt-15 justify-between items-center flex-col bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500  shadow-md px-4 py-10">
  <h1 className="font-bold text-3xl  mb-4 gradient-text">
    Property Listing
  </h1>
  <p className="p-4 text-center text-white max-w-xl">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur.
  </p>
</div>
      <div className=" p-3 md:p-3 flex flex-col gap-2 ">

   



{properties_status == "loading" && <LoadingSpinner/>}
{properties_error && <div className="w-full flex justify-center items-center"> <p className="text-red-500 ">Error in Fetching Properties list</p></div>}
{properties_status=='succeeded' && 

<div>

<div className="flex justify-between w-full p-4 items-center">
<SearchInputField
placeholder="Search..."
value={search}
onChange={(e) => setSearch(e.target.value)}
/>
<SearchInputField
placeholder="Location"
value={location}
onChange={(e) => setLocation(e.target.value)}
/>
<SearchInputField
placeholder="Min Price"
value={minPrice}
onChange={(e) => setMinPrice(e.target.value)}
/>
   
    

</div>


<div className="flex justify-between pb-5 items-center">
    <p >Showing 2 of 2</p>
    <div className="flex gap-2">
        <Grid className={`hover:text-amber-500 hover:text-xl ${isList? "" : "text-amber-500"}`} onClick={() => setIsList(false)}/>
        <List className={`hover:text-amber-500 hover:text-xl ${isList? "text-amber-500" : ""}`} onClick={() => setIsList(true)}/>
    </div>
    
</div>


<div className="w-full flex flex-wrap gap-x-6 gap-y-7 justify-center  ">
 
{properties.map((property) => (
  <div key={property.id}>
    <Link to={`/property/${property.id}`}>
      <PropertyCard property={property} isList= {isList} />
    </Link>
  </div>
))}
</div>

<div className="flex justify-center items-center mt-4">
<button
className="px-4 py-2 text-gray-500  "
onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
>
<SkipBack/>
</button>
<div className="text-white md:text-xl md:font-extrabold rounded p-2 md:p-3  bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500"> <p>{page}</p></div>






<button
className="px-4 py-2 text-gray-500"
onClick={() => setPage((prev) => prev + 1)}
>
<SkipForward/>
</button>
</div>

</div>}








      </div>
      <MiddelSection/>

<Footer/>
      
       
      

    </div>
  )
}

export default PropertyListingPage;

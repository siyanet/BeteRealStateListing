import { ArrowLeft, ArrowRight, Backpack, Filter, Forward, Grid, List } from "lucide-react"
import styled from "styled-components"
import PropertyCard from "../Components/PropertyCard"
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { AppDispatch, RootState } from "../Redux/store";
import { fetchProperties } from "../Redux/PropertySlice";
import LoadingSpinner from "../Components/loading";
import UpperHeader from "../Components/UpperHeader";

import Naviagtion from "../Components/Naviagtion";
import { debounce } from "@mui/material";
import { Link } from "react-router-dom";

export const SearchInputField = styled.input`
  width: 100%;
  max-width: 300px;
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
`;

const PropertyListingPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { properties, properties_status,properties_error } = useSelector((state: RootState) => state.properties);
  
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
      <UpperHeader/>
      <div className="pt-9"></div>
      <Naviagtion/>
        <div className="flex pt-10 justify-between items-center flex-col">
            <h1 className=" font-bold text-xl gradient-text  ">Property Listing</h1>
            <p className="p-4 text-center" >Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur </p>
        </div>


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
    <Filter/>
    

</div>


<div className="flex justify-between items-center">
    <p>showing</p>
    <div className="flex gap-2">
        <Grid/>
        <List/>
    </div>
    
</div>


<div className="grid grid-cols-3 gap-4 pt-10">
 
{properties.map((property) => (
  <div key={property.id}>
    <Link to={`/property/${property.id}`}>
      <PropertyCard property={property} />
    </Link>
  </div>
))}
</div>

<div className="flex justify-center items-center mt-4">
<button
className="px-4 py-2 bg-gray-200 rounded"
onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
>
<ArrowLeft/>
</button>
<span className="mx-2">{page}</span>
<button
className="px-4 py-2 bg-gray-200 rounded"
onClick={() => setPage((prev) => prev + 1)}
>
<ArrowRight/>
</button>
</div>

</div>}




       
      

    </div>
  )
}

export default PropertyListingPage

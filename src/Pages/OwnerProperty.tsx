import { useCallback, useEffect, useState } from "react";
import { FormTitle } from "../Components/FormComponents";
import OwnerComponent from "../Components/OwnerComponent";
import PropertyCard from "../Components/PropertyCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { fetchProperties, Property } from "../Redux/PropertySlice";
import OverlayComponent from "../Components/OverlayComponent";
import PropertyDetailView from "../Components/PropertyDetailView";

const OwnerProperty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDetailOpen,setIsDetailOpen] = useState<Property | null>(null);
  const { properties, properties_status, properties_error } = useSelector(
    (state:RootState) => state.properties
  );
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    price: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    is_available: "",
  });

  const handleSearchAndFilter = useCallback( () => {
    dispatch(
      fetchProperties({
        search,
        filters: {
          price: filters.price ? parseInt(filters.price) : undefined,
          bedrooms: filters.bedrooms ? parseInt(filters.bedrooms) : undefined,
          bathrooms: filters.bathrooms ? parseInt(filters.bathrooms) : undefined,
          location: filters.location || undefined,
          is_available: filters.is_available === "true" ? true : filters.is_available === "false" ? false : undefined,
        },
      })
    );
  },[dispatch,search,filters]);




 
  useEffect(() => {
    if (properties_status === "idle") {
      handleSearchAndFilter();
    }
  }, [properties_status,handleSearchAndFilter]);

  return (
    <OwnerComponent>
      <div className="p-6">
        <FormTitle>Properties</FormTitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
  <input
    type="text"
    placeholder="🔍 Search by title or description"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border border-amber-500 focus:ring-amber-500 focus:border-amber-500 p-2 rounded-xl shadow-sm outline-none transition duration-200"
  />
  <input
    type="number"
    placeholder="💰 Max Price"
    value={filters.price}
    onChange={(e) => setFilters({ ...filters, price: e.target.value })}
    className="border border-amber-500 focus:ring-amber-500 focus:border-amber-500 p-2 rounded-xl shadow-sm outline-none transition duration-200"
  />
  <input
    type="number"
    placeholder="🛏️ Bedrooms"
    value={filters.bedrooms}
    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
    className="border border-amber-500 focus:ring-amber-500 focus:border-amber-500 p-2 rounded-xl shadow-sm outline-none transition duration-200"
  />
  <input
    type="number"
    placeholder="🛁 Bathrooms"
    value={filters.bathrooms}
    onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
    className="border border-amber-500 focus:ring-amber-500 focus:border-amber-500 p-2 rounded-xl shadow-sm outline-none transition duration-200"
  />
  <input
    type="text"
    placeholder="📍 Location"
    value={filters.location}
    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
    className="border border-amber-500 focus:ring-amber-500 focus:border-amber-500 p-2 rounded-xl shadow-sm outline-none transition duration-200"
  />
  <select
    value={filters.is_available}
    onChange={(e) => setFilters({ ...filters, is_available: e.target.value })}
    className="border border-amber-500 focus:ring-amber-500 focus:border-amber-500 p-2 rounded-xl shadow-sm outline-none transition duration-200"
  >
    <option value="">✨ Availability</option>
    <option value="true">✅ Available</option>
    <option value="false">❌ Not Available</option>
  </select>

  <div className="md:col-span-2 lg:col-span-3 flex justify-center">
    <button
      onClick={handleSearchAndFilter}
      className="bg-amber-500 text-white rounded-xl px-6 py-2 font-medium shadow hover:bg-amber-600 transition duration-200"
    >
      🎯 Apply Filters
    </button>
  </div>
</div>


        {properties_status === "loading" && <p>Loading...</p>}
        {properties_status === "failed" && <p className="text-red-500">{properties_error}</p>}
        {properties_status === "succeeded" && properties.length == 0 && <p className="text-center font-bold font-lato  text-amber-500"> No Property</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {properties.map((property) => (
            <div key={property.id} onClick={()=>setIsDetailOpen(property)}><PropertyCard isList= {false} key={property.id} property={property} />
          </div>))}
        </div>
        {isDetailOpen &&

        <OverlayComponent onClose={()=>setIsDetailOpen(null)}>
          <PropertyDetailView property={isDetailOpen} onClose={() => setIsDetailOpen(null)}/>
        </OverlayComponent>
}
      </div>
    </OwnerComponent>
  );
};

export default OwnerProperty;


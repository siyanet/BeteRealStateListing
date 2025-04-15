import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (properties_status === "idle") {
      dispatch(fetchProperties());
    }
  }, [dispatch, properties_status]);

  return (
    <OwnerComponent>
      <div className="p-6">
        <FormTitle>Properties</FormTitle>

        {properties_status === "loading" && <p>Loading...</p>}
        {properties_status === "failed" && <p className="text-red-500">{properties_error}</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {properties.map((property) => (
            <div key={property.id} onClick={()=>setIsDetailOpen(property)}><PropertyCard key={property.id} property={property} />
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


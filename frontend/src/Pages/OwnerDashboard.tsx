

import { useEffect, useState } from "react";
import { Property } from "../Redux/PropertySlice";
import axiosInstance from "../Components/axiosInstance";
import OwnerComponent from "../Components/OwnerComponent";
import PropertyCard from "../Components/PropertyCard";




interface BusinessData {
  business_name: string;
  verified: boolean;
  total_properties: number;
  available_properties: number;
  sold_properties: number;
  total_agents: number;
  total_team_members: number;
  recent_properties: Property[];
}

// 2. Component
const OwnerDashboard = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<BusinessData>("owner/homepage/"); // Replace with your correct API endpoint
        setBusinessData(res.data);
      } catch (err) {
        setError("Failed to fetch business data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!businessData) return null;

  return (
    <OwnerComponent>
          <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Business Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-500">{businessData.business_name}</h1>
        <p className={`mt-2 text-sm ${businessData.verified ? 'text-green-500' : 'text-gray-500'}`}>
          {businessData.verified ? "Verified Business" : "Not Verified"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-bold">{businessData.total_properties}</h2>
          <p className="text-gray-500">Total Properties</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-bold">{businessData.available_properties}</h2>
          <p className="text-gray-500">Available Properties</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-bold">{businessData.sold_properties}</h2>
          <p className="text-gray-500">Sold Properties</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-bold">{businessData.total_agents}</h2>
          <p className="text-gray-500">Total Agents</p>
        </div>
      </div>

      {/* Recent Properties */}
      <h2 className="text-2xl font-semibold mb-6">Recent Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {businessData.recent_properties.map((property) => (
          // <div key={property.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          //   <img
          //     src={property.images[0]?.image}
          //     alt={property.title}
          //     className="w-full h-56 object-cover"
          //   />
          //   <div className="p-6">
          //     <h3 className="text-xl font-bold mb-2">{property.title}</h3>
          //     <p className="text-gray-600 mb-4">{property.description}</p>

          //     <div className="flex justify-between text-sm text-gray-500 mb-2">
          //       <span>Location: {property.location}</span>
          //       <span>Price: ${parseFloat(property.price).toLocaleString()}</span>
          //     </div>

          //     <div className="flex justify-between text-sm text-gray-500">
          //       <span>Bedrooms: {property.bedrooms}</span>
          //       <span>Bathrooms: {property.bathrooms}</span>
          //       <span>Kitchen: {property.kitchen}</span>
          //     </div>
          //   </div>
          // </div>

          <PropertyCard property={property} isList= {false}></PropertyCard>
        ))}
      </div>
    </div>
    </OwnerComponent>

  );
};

export default OwnerDashboard;



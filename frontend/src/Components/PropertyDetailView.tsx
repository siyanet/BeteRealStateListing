import { useState } from "react";
import { Property } from "../Redux/PropertySlice";

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetailView: React.FC<PropertyDetailProps> = ({ property, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: property.title,
    price: property.price,
    location: property.location,
    description: property.description,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    kitchen: property.kitchen,
    living_rooms: property.living_rooms,
    square_meters: property.square_meters,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: dispatch update action here
    console.log("Updated data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-4">Property Details</h2>

      {isEditing ? (
        <div className="grid gap-4">
          <input name="title" value={formData.title} onChange={handleChange} className="border p-2 rounded" placeholder="Title" />
          <input name="price" value={formData.price} onChange={handleChange} className="border p-2 rounded" placeholder="Price" />
          <input name="location" value={formData.location} onChange={handleChange} className="border p-2 rounded" placeholder="Location" />
          <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded" placeholder="Description" />
          <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="border p-2 rounded" placeholder="Bedrooms" />
          <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="border p-2 rounded" placeholder="Bathrooms" />
          <input type="number" name="kitchen" value={formData.kitchen} onChange={handleChange} className="border p-2 rounded" placeholder="Kitchens" />
          <input type="number" name="living_rooms" value={formData.living_rooms} onChange={handleChange} className="border p-2 rounded" placeholder="Living Rooms" />
          <input name="square_meters" value={formData.square_meters} onChange={handleChange} className="border p-2 rounded" placeholder="Square Meters" />

          <div className="flex justify-between mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
            <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p><strong>Title:</strong> {property.title}</p>
          <p><strong>Price:</strong> {property.price} ETB</p>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Description:</strong> {property.description}</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
          <p><strong>Kitchens:</strong> {property.kitchen}</p>
          <p><strong>Living Rooms:</strong> {property.living_rooms}</p>
          <p><>Square Meters:</> {property.square_meters}</p>

          <div className="flex justify-between mt-4">
            <button className="bg-amber-500 text-white px-4 py-2 rounded" onClick={handleEdit}>Edit</button>
            <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailView;

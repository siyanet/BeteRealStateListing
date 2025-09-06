import { useDispatch, useSelector } from "react-redux";
import { CheckboxLabel, CheckboxWrapper, CustomCheckbox, FormTitle, InputField, SubmitButton } from "../Components/FormComponents"
import OwnerComponent from "../Components/OwnerComponent"
import { AppDispatch, RootState } from "../Redux/store";
import { useEffect, useState } from "react";
import { fetchAgents } from "../Redux/agentSlice";
import axiosInstance from "../Components/axiosInstance";
import { toast } from "react-toastify";
import { InputLabel } from "@mui/material";
import { fetchProperties } from "../Redux/PropertySlice";


const AddPropertyPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { agents, agent_status, agent_error } = useSelector(
        (state: RootState) => state.agents
      );
      const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        bedrooms: 0,
        bathrooms: 0,
        kitchen: 0,
        living_rooms: 0,
        square_meters: "",
        is_available: true,
        selectedAgents: [] as number[],
      });
      const [propertyImages, setPropertyImages] = useState<File[]>([]);

      useEffect(() => {
        if (agent_status === "idle") {
          dispatch(fetchAgents());
        }
      }, [agent_status, dispatch]);
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      };
      const handleAgentCheckbox = (id: number) => {
        setFormData((prev) => {
          const isSelected = prev.selectedAgents.includes(id);
          return {
            ...prev,
            selectedAgents: isSelected
              ? prev.selectedAgents.filter((agentId) => agentId !== id)
              : [...prev.selectedAgents, id],
          };
        });}
        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              setPropertyImages(Array.from(e.target.files));
            }
          };
          


        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            const submissionData = new FormData();
            submissionData.append("title", formData.title);
            submissionData.append("description", formData.description);
            submissionData.append("price", formData.price);
            submissionData.append("location", formData.location);
            submissionData.append("bedrooms", formData.bedrooms.toString());
            submissionData.append("bathrooms", formData.bathrooms.toString());
            submissionData.append("kitchen", formData.kitchen.toString());
            submissionData.append("living_rooms", formData.living_rooms.toString());
            submissionData.append("square_meters", formData.square_meters.toString());
            submissionData.append("is_available", formData.is_available.toString());
        
            formData.selectedAgents.forEach((agentId) => {
              submissionData.append("agents", String(agentId));
            });
        
            propertyImages.forEach((imageFile) => {
              submissionData.append("images", imageFile);
            });
        
            try {
              const response = await axiosInstance.post("property/", submissionData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
        
         
              if (response.status === 201) {
                toast.success("Property created successfully!");
                setFormData({
                  title: "",
                  description: "",
                  price: "",
                  location: "",
                  bedrooms: 0,
                  bathrooms: 0,
                  kitchen: 0,
                  living_rooms: 0,
                  square_meters: "",
                  is_available: true,
                  selectedAgents: [],
                });
                dispatch(fetchProperties({}));
              }
            } catch (error) {
              console.error(error);
              toast.error("Failed to create property");
            }
          };
  return (
    <OwnerComponent>
        <>
        {agent_status === "loading" && <p>Loading agents...</p>}
      {agent_status === "failed" && <p>Error: {agent_error}</p>}
      {agent_status === "succeeded" && (
        <>
            <FormTitle>Add Property</FormTitle>
            <form onSubmit={handleSubmit}>
              <div>
                <InputLabel htmlFor="title">Title</InputLabel>
                <InputField
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter title"
                  required
                />
              </div>
              <div>
                <InputLabel htmlFor="description">Description</InputLabel>
                <InputField
                  as="textarea"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  required
                />
              </div>
              <div>
                <InputLabel htmlFor="price">Price</InputLabel>
                <InputField
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  required
                />
              </div>
              <div>
                <InputLabel htmlFor="location">Location</InputLabel>
                <InputField
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <InputLabel htmlFor="bedrooms">Bedrooms</InputLabel>
                  <InputField
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <InputLabel htmlFor="bathrooms">Bathrooms</InputLabel>
                  <InputField
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <InputLabel htmlFor="kitchen">Kitchen</InputLabel>
                  <InputField
                    type="number"
                    id="kitchen"
                    name="kitchen"
                    value={formData.kitchen}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <InputLabel htmlFor="living_rooms">Living Rooms</InputLabel>
                  <InputField
                    type="number"
                    id="living_rooms"
                    name="living_rooms"
                    value={formData.living_rooms}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <InputLabel htmlFor="square_meters">Square Meters</InputLabel>
                <InputField
                  type="number"
                  id="square_meters"
                  name="square_meters"
                  value={formData.square_meters}
                  onChange={handleInputChange}
                  placeholder="e.g. 120.5"
                  required
                />
              </div>


              <div>
  <InputLabel htmlFor="property_images">Property Images</InputLabel>
  <InputField
    type="file"
    id="property_images"
    multiple
    accept="image/*"
    onChange={handleImageChange}
  />
</div>


              <div>
                <InputLabel htmlFor="is_available">Available</InputLabel>
                <input
                  type="checkbox"
                  id="is_available"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <InputLabel>Assign Agents</InputLabel>
                <CheckboxWrapper>
                  {agents.map((agent) => (
                    <div key={agent.id}>
                      <CustomCheckbox
                        type="checkbox"
                        id={`agent-${agent.id}`}
                        checked={formData.selectedAgents.includes(agent.id)}
                        onChange={() => handleAgentCheckbox(agent.id)}
                      />
                      <CheckboxLabel htmlFor={`agent-${agent.id}`}>
                        {agent.user?.first_name} {agent.user?.last_name}
                      </CheckboxLabel>
                    </div>
                  ))}
                </CheckboxWrapper>
              </div>
              <div className="flex justify-center mt-4">
                <SubmitButton type="submit">Add Property</SubmitButton>
              </div>
            </form>
        </>)}
        </>
    </OwnerComponent>
  )
}

export default AddPropertyPage;

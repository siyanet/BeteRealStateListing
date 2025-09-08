import { useState } from "react";
import { Agent, fetchAgents } from "../Redux/agentSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";
import { CheckboxWrapper, CustomCheckbox, FormContainer, FormTitle, InputField, InputLabel, SubmitButton } from "./FormComponents";

interface AgentFormProps{
    onClose: () => void;
    agent?: Agent
}

const AgentForm:React.FC<AgentFormProps> = ({onClose,agent}) => {
  const isEditing = Boolean(agent);
  const [formData,setFormData] = useState<{
    agent_email: string;
    agent_first_name: string;
    agent_last_name: string;
    agent_password: string;
    agent_phone_number: string;
    agent_bio: string;
    agent_profile_image: File | null; // Allow File as well
    is_available: boolean;
  }>({
    agent_email: agent?.user.email || "",
    agent_first_name: agent?.user.first_name || "",
    agent_last_name: agent?.user.last_name || "",
    agent_password: '',
    agent_phone_number: agent?.phone_number || "",
    agent_bio : agent?.bio || "",
    agent_profile_image:  null,
    is_available: agent?.is_available || true

  });
  const [errors,setErrors] = useState({
    agent_email: "",
    agent_first_name: "",
    agent_last_name: "",
    agent_phone_number: "",
    agent_bio: "",
    agent_profile_image: "",
    agent_password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
    validateField(name, value);
};


const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Safely access the first file

    if (file) {
        setFormData((prev) => ({
            ...prev,
            agent_profile_image: file, // Store file object
        }));
    }
};

const handleCheckboxChange = () => {
    setFormData((prev) => ({
        ...prev,
        is_available: !prev.is_available, // Toggle availability
    }));
};
const validateField = (name: string, value: string) => {
    let errorMsg = "";
    switch (name) {
        case "agent_email":
            if (!value) {
                errorMsg = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                errorMsg = "Please enter a valid email address";
            }
            break;
        case "agent_first_name":
            if (!value) {
                errorMsg = "First name is required";
            }
            break;
        case "agent_last_name":
            if (!value) {
                errorMsg = "Last name is required";
            }
            break;
        case "agent_password":
            if (!isEditing && (!value || value.length < 6)) {
                errorMsg = "Password must be at least 6 characters long";
            }
            break;
        default:
            break;
    }
    setErrors((prev) => ({
        ...prev,
        [name]: errorMsg,
    }));
};


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all errors are resolved before submitting
    if (Object.values(errors).some((error) => error)) {
        toast.error("Please fix the errors before submitting.");
        return;
    }

    const formPayload = new FormData();
    formPayload.append("user.email", formData.agent_email);
    formPayload.append("user.first_name", formData.agent_first_name);
    formPayload.append("user.last_name", formData.agent_last_name);
    if (!isEditing) {
        formPayload.append("user.password", formData.agent_password);
    }
    formPayload.append("phone_number", formData.agent_phone_number);
    formPayload.append("bio", formData.agent_bio);
    formPayload.append("is_available", String(formData.is_available));
    
    if (formData.agent_profile_image instanceof File) {
        formPayload.append("profile_image", formData.agent_profile_image);
    }
    console.log("filenone");
    console.log(formPayload);
    for (const [key, value] of formPayload.entries()) {
        console.log(`${key}:`, value);
    }
    
    console.log(formData)

    try {
        if (isEditing && agent) {
            const response = await axiosInstance.patch(`agent/${agent.id}/`, formPayload ,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success("Agent updated successfully!");
                setTimeout(()=>{
                    dispatch(fetchAgents());
                    onClose();
                }, 2000);
            }
        } else {
            const response = await axiosInstance.post("agent/", formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                toast.success("Agent created successfully!");
                setTimeout(()=>{
                    dispatch(fetchAgents());
                    onClose()
                }, 2000);
            }
        }
    } catch (error) {
        console.error("Error submitting agent:", error);
        toast.error("Failed to submit agent.");
    }
};


    return (
    <div>
        <FormContainer>
            <FormTitle>{isEditing? "Update Agent" : "Create New Agent"}</FormTitle>
            <form onSubmit={handleSubmit}>
            <div>
                    <InputLabel htmlFor="agent_email">Email</InputLabel>
                    <InputField
                        type="email"
                        id="agent_email"
                        name="agent_email"
                        value={formData.agent_email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        required
                    />
                    {errors.agent_email && <p className="text-red-500">{errors.agent_email}</p>}
                </div>
                <div>
                    <InputLabel htmlFor="agent_first_name">First Name</InputLabel>
                    <InputField
                        type="text"
                        id="agent_first_name"
                        name="agent_first_name"
                        value={formData.agent_first_name}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        required
                    />
                </div>


                <div>
                    <InputLabel htmlFor="agent_last_name">Last Name</InputLabel>
                    <InputField
                        type="text"
                        id="agent_last_name"
                        name="agent_last_name"
                        value={formData.agent_last_name}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        required
                    />
                </div>
                <div>
                    <InputLabel htmlFor="agent_password">Password</InputLabel>
                    <InputField 
                    type = "password"
                    id="agent_password"
                    name="agent_password"
                    value = {formData.agent_password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    required = {!isEditing}/>
                </div>


                <div>
                    <InputLabel htmlFor="agent_phone_number">Phone Number</InputLabel>
                    <InputField
                        type="text"
                        id="agent_phone_number"
                        name="agent_phone_number"
                        value={formData.agent_phone_number}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        required
                    />
                </div>


                <div>
                    <InputLabel htmlFor="agent_bio">Bio</InputLabel>
                    <InputField
                        type="text"
                        id="agent_bio"
                        name="agent_bio"
                        value={formData.agent_bio}
                        onChange={handleInputChange}
                        placeholder="Enter bio"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="agent_profile_image">Profile Image</InputLabel>
                    <InputField type="file" id="agent_profile_image" onChange={handleFileChange} />
                </div>



                <CheckboxWrapper>
                    <CustomCheckbox
                        type="checkbox"
                        id="is_available"
                        checked={formData.is_available}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="is_available">Is Available</label>
                </CheckboxWrapper>
                <div className="w-full flex justify-center items-center">
                <SubmitButton type="submit">{isEditing ? "Update Agent" : "Create Agent"}</SubmitButton>
                </div>

                {/* Submit Button */}

            

            </form>
        
        </FormContainer>
      
    </div>
  )
}

export default AgentForm

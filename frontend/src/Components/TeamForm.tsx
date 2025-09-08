
import { useEffect, useState } from "react";
import { fetchRoles} from "../Redux/role"; // Assuming roles are fetched from Redux
import axiosInstance from "./axiosInstance";
import { CheckboxLabel, CheckboxWrapper, CustomCheckbox, FormContainer, FormTitle, FormWrapper, InputField, InputLabel, SubmitButton } from "./FormComponents";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import LoadingSpinner from "./loading";
import { fetchTeamMembers, TeamMember } from "../Redux/teamMember";

interface TeamMemberAddFormProps {
    onClose: () => void;  // onClose should be a function that takes no arguments and returns nothing
    team_member?: TeamMember
}

const TeamMemberAddForm: React.FC<TeamMemberAddFormProps> = ({ onClose,team_member }) => {
    const { roles, roles_status, roles_error } = useSelector(
        (state: RootState) => state.roles // Assuming roles are fetched from Redux
    );
   const isEditing = Boolean(team_member);
    // Single state object for all form data
    const [formData, setFormData] = useState({
        team_email: team_member?.user.email || "",
        team_firstName: team_member?.user.first_name ||"",
        team_lastName: team_member?.user.last_name ||"",
        team_password: "",
        selectedRoles: team_member?.role_details.map(role =>role.uuid)  || [], // List of selected role IDs
    });

    const [errors, setErrors] = useState({
        team_email: "",
        team_firstName: "",
        team_lastName: "",
        team_password: "",
    });

    const dispatch = useDispatch<AppDispatch>();

    // Fetch roles when the component mounts or the roles status is idle
    useEffect(() => {
        if (roles_status === "idle") {
            dispatch(fetchRoles());
        }
    }, [roles_status, dispatch]);

    // Handle form data change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        validateField(name, value);
    };

    const validateField = (name: string, value: string) => {
        let errorMsg = "";
        switch (name) {
            case "team_email":
                if (!value) {
                    errorMsg = "Email is required";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    errorMsg = "Please enter a valid email address";
                }
                break;
            case "team_firstName":
                if (!value) {
                    errorMsg = "First name is required";
                }
                break;
            case "team_lastName":
                if (!value) {
                    errorMsg = "Last name is required";
                }
                break;
            case "team_password":
                if (!value) {
                    errorMsg = "Password is required";
                } else if (value.length < 6) {
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

    // Handle checkbox selection for roles
    const handleCheckboxChange = (roleId: string) => {
        setFormData((prev) => {
            const updatedRoles = prev.selectedRoles.includes(roleId)
                ? prev.selectedRoles.filter((id) => id !== roleId) // Unselect role if already selected
                : [...prev.selectedRoles, roleId]; // Add role if not selected
            return {
                ...prev,
                selectedRoles: updatedRoles,
            };
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const { team_email, team_firstName, team_lastName, team_password, selectedRoles } = formData;
        const formPayload = {
            user: {
                uuid: team_member?.uuid || "",
                email: team_email,
                first_name: team_firstName,
                last_name: team_lastName,
                password: team_password,
            },
            roles: selectedRoles, // List of role IDs
        };
        console.log("selectedroles")
        console.log(selectedRoles);
        console.log(formPayload);

        if (Object.values(errors).some((error) => error)) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        try {
            if(isEditing && team_member){
                console.log('krehkjhrer');
                const response = await axiosInstance.patch(`team_members/${team_member.uuid}}/`, formPayload); // Assuming API endpoint
                if (response.status === 200) {
                    toast.success("Team member updated successfully!");
                
                    setTimeout(() => {
                        dispatch(fetchTeamMembers())
                        onClose(); // Close the form after success
                    }, 2000);
                }
                
                

            }
            else{
                const response = await axiosInstance.post("team_members/", formPayload); // Assuming API endpoint
                if (response.status === 201) {
                    toast.success("Team member created successfully!");
                
                    setTimeout(() => {
                        dispatch(fetchTeamMembers())
                        onClose(); // Close the form after success
                    }, 2000);
                }

            }
          
        } catch (error) {
            console.error("Error creating team member:", error);
            toast.error("Failed to create team member");
        }
    };

    return (
        <div>
            {roles_status === "loading" && <LoadingSpinner/>}
            {roles_status === "failed" && <p>Error: {roles_error}</p>}
            {roles_status === "succeeded" && (
                <FormWrapper>
                    <FormContainer>
                        <FormTitle>{isEditing?  "Update Team Member": "Create New Team Member"}</FormTitle>
                        <form onSubmit={handleSubmit}>
                            {/* Input for email */}
                            <div>
                                <InputLabel htmlFor="team_email">Email</InputLabel>
                                <InputField
                                    type="email"
                                    id="team_email"
                                    name="team_email"
                                    value={formData.team_email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    required
                                />
                                {errors.team_email && <p>{errors.team_email}</p>}
                            </div>

                            {/* Input for first name */}
                            <div>
                                <InputLabel htmlFor="firstName">First Name</InputLabel>
                                <InputField
                                    type="text"
                                    id="firstName"
                                    name="team_firstName"
                                    value={formData.team_firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter first name"
                                    required
                                />
                                {errors.team_firstName && <p>{errors.team_firstName}</p>}
                            </div>

                            {/* Input for last name */}
                            <div>
                                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                <InputField
                                    type="text"
                                    id="lastName"
                                    name="team_lastName"
                                    value={formData.team_lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter last name"
                                    required
                                />
                                {errors.team_lastName && <p>{errors.team_lastName}</p>}
                            </div>

                            {/* Input for password */}
                            <div>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <InputField
                                    type="password"
                                    id="password"
                                    name="team_password"
                                    value={formData.team_password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password"
                                    
                                />
                                {errors.team_password && <p>{errors.team_password}</p>}
                            </div>

                            {/* Display roles as checkboxes */}
                            <div>
                                <InputLabel>Roles</InputLabel>
                                <CheckboxWrapper>
                                    {roles.map((role) => (
                                        <div key={role.uuid}>
                                            <CustomCheckbox
                                                type="checkbox"
                                                id={`role-${role.uuid}`}
                                                checked={formData.selectedRoles.includes(role.uuid)}
                                                onChange={() => handleCheckboxChange(role.uuid)}
                                            />
                                            <CheckboxLabel htmlFor={`role-${role.uuid}`}>
                                                {role.name}
                                            </CheckboxLabel>
                                        </div>
                                    ))}
                                </CheckboxWrapper>
                            </div>

                            {/* Submit button */}
                            <div className="flex justify-center items-center">
                                <SubmitButton type="submit">{isEditing?  "Update Team Member": "Create Team Member"}</SubmitButton>
                            </div>
                        </form>
                    </FormContainer>
                </FormWrapper>
            )}
        </div>
    );
};

export default TeamMemberAddForm;

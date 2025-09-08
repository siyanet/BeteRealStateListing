import { useEffect, useState } from "react";
import { fetchRoles } from "../Redux/role";
import axiosInstance from "./axiosInstance";
import { CheckboxLabel, CheckboxWrapper, CustomCheckbox, FormContainer, FormTitle, FormWrapper, InputField, InputLabel, SubmitButton } from "./FormComponents";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { fetchPermissions } from "../Redux/permissions";

interface RoleAddFormProps {
    onClose: () => void;  // onClose should be a function that takes no arguments and returns nothing
  }

const RoleAddForm:React.FC<RoleAddFormProps> = ({onClose}) => {
  const { permissions, permissions_status, permissions_error } = useSelector(
    (state: RootState) => state.permissions
  );
    const [roleName, setRoleName] = useState<string>("");
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      if (permissions_status === "idle") {
        dispatch(fetchPermissions());
      }
    }, [permissions_status, dispatch]);


    const handleCheckboxChange =  (permissionId: number) => {
        setSelectedPermissions((prev) => {
          if (prev.includes(permissionId)) {
            return prev.filter((id) => id !== permissionId);
          }
          return [...prev, permissionId];
        });
      };


      const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
    
        const formData = {
          name: roleName,
          permissions: selectedPermissions,
        };
        console.log(selectedPermissions);
        console.log("form data");
        console.log(formData);
        try{
            const response = await axiosInstance.post('roles/',formData);
            console.log(response.data);
            if(response.status===201){
            
                toast.success("Role Created Successfully");
                setTimeout(() =>{
                    dispatch(fetchRoles())
                    onClose()
                },2000)

            }

        }
        catch (error) {
            console.error("Error creating role:", error);
            toast.error("Failed to create role");
          }
    
    }
  return (
    <div>
       {permissions_status === "loading" && <p>Loading...</p>}
       {permissions_status === "failed" && <p>Error: {permissions_error}</p>}
       {permissions_status === "succeeded" && 
         <FormWrapper>
      <FormContainer>
        <FormTitle>Create New Role</FormTitle> 
        <form onSubmit={handleSubmit}>
          <div>
            <InputLabel htmlFor="roleName">Role Name</InputLabel>
            <InputField
              type="text"
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter role name"
              required
            />
          </div>

          <div>
            <InputLabel>Permissions</InputLabel>
            <CheckboxWrapper> 
              {permissions.map((permission) => (
                <div key={permission.id}>
                  <CustomCheckbox
                    type="checkbox"
                    id={`permission-${permission.id}`}
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={() => handleCheckboxChange(permission.id)}
                  />
                  <CheckboxLabel htmlFor={`permission-${permission.id}`}>
                    {permission.name}
                  </CheckboxLabel>
                </div>
              ))}
            </CheckboxWrapper>
          </div>
          <div className="flex justify-center items-center">
          <SubmitButton type="submit">Create Role</SubmitButton></div>

        </form>
      </FormContainer>
    </FormWrapper> 
}
      
    </div>
  )
}

export default RoleAddForm

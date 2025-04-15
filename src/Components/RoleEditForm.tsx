import { useState,useEffect } from "react";
import { fetchRoles,  Role } from "../Redux/role";
import { CheckboxLabel, CheckboxWrapper, CustomCheckbox, FormContainer, FormTitle, FormWrapper, InputField, InputLabel, RedButton, SubmitButton } from "./FormComponents";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { fetchPermissions } from "../Redux/permissions";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";



interface RoleEditFormProps {
    onClose: ()=>void;
    role: Role;
}
const RoleEditForm:React.FC<RoleEditFormProps> = ({onClose,role}) => {
const [roleName,setRoleName] = useState<string>(role.name)
const [selectedPermission ,setSelectedPermission] = useState<number[]>(role.permission_details.map((permission) => permission.id))
const dispatch = useDispatch<AppDispatch>();
  const { permissions, permissions_status, permissions_error } = useSelector(
    (state: RootState) => state.permissions
  );

  useEffect(() => {
    if (permissions_status === "idle") {
      dispatch(fetchPermissions());
    }
  }, [permissions_status, dispatch]);

const handleCheckboxChange = (permissionId: number)=>{
    setSelectedPermission((prev) =>{
        if(prev.includes(permissionId)){
            return prev.filter((id) =>id !== permissionId)

        }
        return[...prev,permissionId];
    });

}

const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    const formData = {
        name: roleName,
        permissions:selectedPermission
    }
    try{
        const response = await axiosInstance.patch(`roles/${role.uuid}/`,formData)
        if(response.status === 200){
            toast.success("Role Updated Successfully")
            setTimeout(()=>{
                dispatch(fetchRoles());
                onClose()
            },2000)
        }
    }
    catch(error){
        console.error("Error updating role:", error);
        toast.error("Failed to create Role");
    }
}

  return (
    <div>
         {permissions_status === "loading" && <p>Loading...</p>}
       {permissions_status === "failed" && <p>Error: {permissions_error}</p>}
       {permissions_status === "succeeded" && 
        <FormWrapper>
            <FormContainer>
                <FormTitle>Edit Role {role.name}</FormTitle>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputLabel htmlFor="roleName">RoleName</InputLabel>
                        <InputField
                        type="text"
                        id = "roleName"
                        value = {roleName}
                        onChange={(e)=> setRoleName(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <InputLabel>Permissions</InputLabel>
                        <CheckboxWrapper>
                            {permissions.map((permission) =>(
                                <div key={permission.id}>
                                    <CustomCheckbox
                                    type = 'checkbox'
                                    id = {`permission ${permission.id}`}
                                    checked = {selectedPermission.includes(permission.id)}
                                    onChange={() => handleCheckboxChange(permission.id)}

                                    />
                                    <CheckboxLabel  htmlFor={`permission ${permission.id}`}>
                                        {permission.name}

                                    </CheckboxLabel>
                                    </div>
                              
                                
                            ))}

                        </CheckboxWrapper>
                    </div>
                       <div className="flex justify-between items-center">
                       <RedButton onClick={onClose}>Cancel</RedButton>
                              <SubmitButton type="submit">Edit Role</SubmitButton>
                             
                              </div>
                    
                </form>
            </FormContainer>
        </FormWrapper>
}
    </div>
  )
}

export default RoleEditForm

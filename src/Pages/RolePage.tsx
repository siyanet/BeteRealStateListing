import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, Permission, Role } from "../Redux/role";
import { AppDispatch, RootState } from "../Redux/store";
import OwnerComponent from "../Components/OwnerComponent";
import { TableWrapper, StyledTable, TableHeader, TableRow, TableHeaderCell, TableCell } from "../Components/TableComponent"; // Importing the styled components
import { Delete, Edit, Plus } from "lucide-react";
import OverlayComponent from "../Components/OverlayComponent";
import RoleAddForm from "../Components/RoleAddForm";
import RoleEditForm from "../Components/RoleEditForm";
import { FormTitle, RedButton, SubmitButton } from "../Components/FormComponents";
import axiosInstance from "../Components/axiosInstance";
import { toast } from "react-toastify";

const RolesComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { roles, roles_status, roles_error } = useSelector((state: RootState) => state.roles);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // State to manage overlay visibility
  const [isEditOpen,setIsEditOpen] = useState(false);
  const [isDeleteOpen,setIsDeleteOpen] = useState(false);
  const [selectedRole,setSelectedRole] = useState<Role |null>();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  if (roles_status === "loading") {
    return <div>Loading...</div>;
  }

  if (roles_status === "failed") {
    return <div>Error: {roles_error}</div>;
  }

  const handleAddRole = () => {
    // Add the logic to handle the new role creation

    setIsOverlayOpen(false); // Close the overlay after action
  };

  const handleDelete = async (e:  React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    if(!selectedRole){
      return
    }
    
    try{
      const response = await axiosInstance.delete(`roles/${selectedRole.uuid}/`);
      if(response.status === 204){
        toast.success("Role Deleted Successfully");
        setTimeout(()=>
          {
            dispatch(fetchRoles());
            setIsDeleteOpen(false);
          },2000);
      }
      

    }
    catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Failed to delete role");
    }
  }


  return (

    <OwnerComponent>
      <div className="w-full h-full">
        <div className="flex justify-between items-center">
          <h1 className="p-2 font-bold text-md md:text-xl font-lato gradient-text">Role</h1>
          <Plus onClick={() => setIsOverlayOpen(true)} className="cursor-pointer" /> 
        </div>

        {/* Table Section */}
        <TableWrapper>
          <StyledTable>
            <TableHeader>
              <tr>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Permissions</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              
              </tr>
            </TableHeader>
            <tbody className="font-lato font-medium text-lg">
              {roles.map((role:Role) => (
                <TableRow key={role.uuid}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.permissions.map((permission: Permission) => (
                    <span key={permission.id}>{permission.name}, </span>
                  ))}</TableCell>
                  <div className="flex px-[12px] py-[15px] justify-around items-center text-center text-amber-500 ">
                    <Edit onClick={() => {setIsEditOpen(true) ;setSelectedRole(role)}}/>
                    <Delete onClick={() =>{setIsDeleteOpen(true); setSelectedRole(role)}}/>
                  </div>
                 
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </div>



      {isOverlayOpen && (
        <OverlayComponent onClose={() => setIsOverlayOpen(false)}>
          <div>
            <RoleAddForm onClose={handleAddRole}/>
          </div>
        </OverlayComponent>
      )}

      {isEditOpen && selectedRole && (
        <OverlayComponent onClose={() =>setIsEditOpen(false)}>
          <div>
            <RoleEditForm onClose={() =>{setIsEditOpen(false)}} role={selectedRole}/>
          </div>
        </OverlayComponent>
      )}
      {isDeleteOpen && selectedRole &&(
        <OverlayComponent onClose={() =>setIsDeleteOpen(false)}>
          <div>
            <FormTitle> Are You sure You Want to delete {selectedRole.name} role?</FormTitle>
            <div className="flex justify-between items-center">
            <SubmitButton onClick={() =>setIsDeleteOpen(false)}>Cancel</SubmitButton>
            <RedButton onClick={handleDelete}>Delete</RedButton>
            </div>
            
          </div>

        </OverlayComponent>
      )}


    </OwnerComponent>
  );
};

export default RolesComponent;

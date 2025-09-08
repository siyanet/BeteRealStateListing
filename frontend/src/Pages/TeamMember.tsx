
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamMembers, TeamMember} from '../Redux/teamMember';
import { AppDispatch, RootState } from '../Redux/store';
import OwnerComponent from '../Components/OwnerComponent';
import OwnerTableHeader from '../Components/OwnerTableHeader';
import { StyledTable, TableCell, TableHeader, TableHeaderCell, TableRow, TableWrapper } from '../Components/TableComponent';
import LoadingSpinner from '../Components/loading';
import OverlayComponent from '../Components/OverlayComponent';
import TeamMemberAddForm from '../Components/TeamForm';
import { Delete, Edit } from 'lucide-react';
import { FormTitle, RedButton, SubmitButton } from '../Components/FormComponents';
import axiosInstance from '../Components/axiosInstance';
import { toast } from 'react-toastify';
const TeamMemberPage:React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { teamMembers, teamMemberStatus, teamMemberError } = useSelector((state:RootState) => state.teamMembers);
    const [isOverlayOpen,setIsOverlayOpen] = useState(false);
    const [isEditOpen,setIsEditOpen] = useState(false);
    const [isDeleteOpen,setIsDeleteOpen] = useState(false);
    const [selecetedTeamMember,setSelectedTeamMember] = useState<TeamMember| null>();

    useEffect(() => {
        if (teamMemberStatus === 'idle') {
          dispatch(fetchTeamMembers());
        }
      }, [dispatch, teamMemberStatus]);


      const handleDelete = async (e:  React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        if(!selecetedTeamMember){
            return
        }
        try{
            const response = await axiosInstance.delete(`team_members/${selecetedTeamMember.uuid}/`);
            if (response.status === 204){
                toast.success("Team memeber Deleted Successfully");
                setTimeout(()=>{
                    dispatch(fetchTeamMembers());
                    setIsDeleteOpen(false);
                },2000);
            }

        }
        catch(e){
            console.error("error deleting teammember",e);
            toast.error("Failed to delete team member");

        }
    
    }
  return (
    <OwnerComponent>
        {teamMemberStatus === "loading" && <LoadingSpinner/>}
        {teamMemberStatus === "failed" && <div className='flex justify-center items-center'> <h1 className='text-red text-bold'>error {teamMemberError}</h1></div>}
        {teamMemberStatus === 'succeeded' && 
        <div>
            <OwnerTableHeader onClick={() => {setIsOverlayOpen(true)}} name = "Team Member"/>
            <TableWrapper>
                <StyledTable>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>First Name</TableHeaderCell>
                            <TableHeaderCell>Last Name</TableHeaderCell>
                            <TableHeaderCell>Role</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </tr>


                    </TableHeader>
                    <tbody className="font-lato font-medium text-lg">
                        {teamMembers.map((team_member:TeamMember) =>(
                            <TableRow key={team_member.uuid}>
                                <TableCell>{team_member.user.email}</TableCell>
                                <TableCell>{team_member.user.first_name}</TableCell>
                                <TableCell>{team_member.user.last_name}</TableCell>
                                <TableCell>{team_member.role_details?.map((role) =>(
                                    <h1>{role.name}</h1>
                                ))}</TableCell>

<div className="flex px-[12px] py-[15px] justify-around items-center text-center text-amber-500 ">
                    <Edit onClick={() => {setIsEditOpen(true) ;setSelectedTeamMember(team_member)}}/>
                    {/*  */}
                    <Delete 
                    onClick={() =>{setIsDeleteOpen(true); setSelectedTeamMember(team_member)}}
                    />
                  </div>

                            </TableRow>
                        ))}
                        </tbody>
                </StyledTable>
            </TableWrapper>
        </div>}

        {isOverlayOpen && 
        <OverlayComponent onClose={() => {setIsOverlayOpen(false)}}>
            <TeamMemberAddForm onClose={() => {setIsOverlayOpen(false)}}/></OverlayComponent>}

        {isEditOpen && selecetedTeamMember &&
        <OverlayComponent onClose={() => {setIsEditOpen(false) ; setSelectedTeamMember(null)}}>
            <TeamMemberAddForm onClose={() => {setIsEditOpen(false) ; setSelectedTeamMember(null)}} team_member={selecetedTeamMember}/>
            </OverlayComponent>}

        {isDeleteOpen && selecetedTeamMember && 
        <OverlayComponent onClose={() => {setIsDeleteOpen(false); setSelectedTeamMember(null)}}>
            <div>
                <FormTitle>Are You sure You want to delete {selecetedTeamMember.user.first_name} {selecetedTeamMember.user.last_name} ?</FormTitle>
                <div className='flex w-full justify-between'>
                    <SubmitButton onClick={()=> setIsDeleteOpen(false)}>Cancel</SubmitButton>
                    <RedButton onClick={handleDelete}>Delete</RedButton>
                </div>
            </div>
            </OverlayComponent>}
         

        
    </OwnerComponent>
  )
}

export default TeamMemberPage

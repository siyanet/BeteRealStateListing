
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Agent, fetchAgents } from "../Redux/agentSlice";
import { AppDispatch, RootState } from '../Redux/store';
import axiosInstance from '../Components/axiosInstance';
import OwnerComponent from '../Components/OwnerComponent';
import LoadingSpinner from '../Components/loading';
import OwnerTableHeader from '../Components/OwnerTableHeader';
import { StyledTable, TableHeader, TableHeaderCell, TableWrapper } from '../Components/TableComponent';
import { TableCell, TableRow } from '@mui/material';
import { Delete, Edit } from 'lucide-react';
import OverlayComponent from '../Components/OverlayComponent';
import { FormTitle, RedButton, SubmitButton } from '../Components/FormComponents';
import AgentForm from '../Components/AgentForm';


const AgentsPage:React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { agents, agent_status, agent_error } = useSelector((state: RootState) => state.agents);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    
    
    useEffect(() => {
      if (agent_status === 'idle') {
          dispatch(fetchAgents());
       
      }
  }, [dispatch, agent_status]);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedAgent) return;
    
    try {
        const response = await axiosInstance.delete(`agents/${selectedAgent.id}/`);
        if (response.status === 204) {
            toast.success('Agent Deleted Successfully');
            setTimeout(() => {
                dispatch(fetchAgents());
                setIsDeleteOpen(false);
            }, 2000);
        }
    } catch (error) {
        console.error('Error deleting agent', error);
        toast.error('Failed to delete agent');
    }
};
console.log(agents);

  
    return (
      <OwnerComponent>
      {agent_status === 'loading' && <LoadingSpinner />}
      {agent_status === 'failed' && <div className='flex justify-center items-center'><h1 className='text-red font-bold'>Error: {agent_error}</h1></div>}
      {agent_status === 'succeeded' && (
          <div>
            
              <OwnerTableHeader onClick={() => setIsOverlayOpen(true)} name="Agents" />
              <TableWrapper>
                  <StyledTable>
                      <TableHeader>
                          <tr>
                              <TableHeaderCell>Email</TableHeaderCell>
                              <TableHeaderCell>First Name</TableHeaderCell>
                              <TableHeaderCell>Last Name</TableHeaderCell>
                              <TableHeaderCell>Phone Number</TableHeaderCell>
                              <TableHeaderCell>Is Available</TableHeaderCell>
                              <TableHeaderCell>Profile</TableHeaderCell>
                              <TableHeaderCell>Actions</TableHeaderCell>
                              
                          </tr>
                      </TableHeader>
                      <tbody className="font-lato font-medium text-lg">
                          {agents.map((agent: Agent) => (
                              <TableRow key={agent.id}>
                                  <TableCell>{agent.user.email}</TableCell>
                                  <TableCell>{agent.user.first_name}</TableCell>
                                  <TableCell>{agent.user.last_name}</TableCell>
                                  <TableCell>{agent.phone_number}</TableCell>
                                  <TableCell>{agent.is_available? "Yes": "No"}</TableCell>
                                  <TableCell><div className=' flex justify-center items-center roudned-full w-10 h-10'><img src={agent.profile_image}/></div></TableCell>
                                      <div className="flex px-3 py-3 justify-around items-center text-amber-500">
                                          <Edit onClick={() => { setIsEditOpen(true); setSelectedAgent(agent); }} />
                                          <Delete onClick={() => { setIsDeleteOpen(true); setSelectedAgent(agent); }} />
                                      </div>
                                  
                              </TableRow>
                          ))}
                      </tbody>
                  </StyledTable>
              </TableWrapper>
          </div>
      )}
      
      {isOverlayOpen && (
          <OverlayComponent onClose={() => setIsOverlayOpen(false)}>
              <AgentForm onClose={() => setIsOverlayOpen(false)} />
          </OverlayComponent>
      )}
      
      {isEditOpen && selectedAgent && (
          <OverlayComponent onClose={() => { setIsEditOpen(false); setSelectedAgent(null); }}>
              <AgentForm onClose={() => { setIsEditOpen(false); setSelectedAgent(null); }} agent={selectedAgent} />
          </OverlayComponent>
      )}
      
      {isDeleteOpen && selectedAgent && (
          <OverlayComponent onClose={() => { setIsDeleteOpen(false); setSelectedAgent(null); }}>
              <div>
                  <FormTitle>Are you sure you want to delete {selectedAgent.user.first_name} {selectedAgent.user.last_name}?</FormTitle>
                  <div className='flex w-full justify-between'>
                      <SubmitButton onClick={() => setIsDeleteOpen(false)}>Cancel</SubmitButton>
                      <RedButton onClick={handleDelete}>Delete</RedButton>
                  </div>
              </div>
          </OverlayComponent>
      )} 
  </OwnerComponent>
  )
}

export default AgentsPage

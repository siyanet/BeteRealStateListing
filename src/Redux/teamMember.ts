import axiosInstance from "../Components/axiosInstance";
import { Role } from "./role";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  role: string;
  first_name: string;
  last_name: string;
}


export interface TeamMember {
    uuid: string;
    owner_name: string;
    owner_email: string;
    user: User;
    role_details: Role[];
   
  }
  interface TeamMemberState {
    teamMembers: TeamMember[];
    teamMemberStatus: "idle" | "loading" | "succeeded" | "failed";
    teamMemberError: string | null;
  }
  const initialState: TeamMemberState = {
    teamMembers: [],
    teamMemberStatus: "idle",
    teamMemberError: null,
  };
  export const fetchTeamMembers = createAsyncThunk<TeamMember[], void, { rejectValue: string }>(
    "teamMembers/fetchTeamMembers",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("team_members/"); // API endpoint for fetching team members
        return response.data as TeamMember[]; // Assuming the response returns an array of team members
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "failed to fetch team members");
      }
    }
  );

  const teamMemberSlice = createSlice({
    name: "teamMembers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTeamMembers.pending, (state) => {
          state.teamMemberStatus = "loading";
        })
        .addCase(fetchTeamMembers.fulfilled, (state, action: PayloadAction<TeamMember[]>) => {
          state.teamMemberStatus = "succeeded";
          state.teamMembers = action.payload;
        })
        .addCase(fetchTeamMembers.rejected, (state, action) => {
          state.teamMemberStatus = "failed";
          state.teamMemberError = action.payload as string;
        });
    },
  });
  
  export default teamMemberSlice.reducer;
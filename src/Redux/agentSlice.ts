import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../Components/axiosInstance";
import { User } from "./teamMember";



export interface Agent {
  id: number;
  owner_name: string;
  owner_email: string;
  user: User;
  phone_number: string;
  profile_image: string;
  bio: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface AgentState {
  agents: Agent[];
  agent_status: "idle" | "loading" | "succeeded" | "failed";
  agent_error: string | null;
}

const initialState: AgentState = {
  agents: [],
  agent_status: "idle",
  agent_error: null,
};

// Thunk to fetch agents from API
export const fetchAgents = createAsyncThunk<Agent[], void, { rejectValue: string }>(
  "agents/fetchAgents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("agent/"); // Replace with actual endpoint
      return response.data as Agent[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch agents");
    }
  }
);

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.agent_status = "loading";
      })
      .addCase(fetchAgents.fulfilled, (state, action: PayloadAction<Agent[]>) => {
        state.agent_status = "succeeded";
        state.agents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.agent_status = "failed";
        state.agent_error = action.payload as string ?? "failed to fetch agents";
      });
  },
});

export default agentSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../Components/axiosInstance";

export interface Permission {
  id: number;
  name: string;
}

export interface Role {
  uuid: string;
  owner_email: string;
  owner_name: string;
  name: string;
  permissions: Permission[];
}

interface RoleState {
  roles: Role[];
  roles_status: "idle" | "loading" | "succeeded" | "failed";
  roles_error: string | null;
}

const initialState: RoleState = {
  roles: [],
  roles_status: "idle",
  roles_error: null,
};

export const fetchRoles = createAsyncThunk<Role[], void, { rejectValue: string }>(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("roles/"); // API endpoint for fetching roles
      return response.data as Role[]; // Assuming the response returns an array of roles
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "failed to fetch roles");
    }
  }
);

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.roles_status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
        state.roles_status = "succeeded";
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.roles_status = "failed";
        state.roles_error = action.payload as string;
      });
  },
});

export default roleSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../Components/axiosInstance";

// Define the Permission interface
export interface Permission {
  id: number;
  codename: string;
  name: string;
}

// Define the state for permissions
interface PermissionState {
  permissions: Permission[];
  permissions_status: "idle" | "loading" | "succeeded" | "failed";
  permissions_error: string | null;
}

// Initial state
const initialState: PermissionState = {
  permissions: [],
  permissions_status: "idle",
  permissions_error: null,
};

// Async thunk for fetching permissions
export const fetchPermissions = createAsyncThunk<
  Permission[],
  void,
  { rejectValue: string }
>(
  "permissions/fetchPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("listpermissions/"); // API endpoint for permissions
      return response.data as Permission[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch permissions");
    }
  }
);

// Create the slice
const permissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.permissions_status = "loading";
      })
      .addCase(fetchPermissions.fulfilled, (state, action: PayloadAction<Permission[]>) => {
        state.permissions_status = "succeeded";
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.permissions_status = "failed";
        state.permissions_error = action.payload as string;
      });
  },
});

export default permissionSlice.reducer;

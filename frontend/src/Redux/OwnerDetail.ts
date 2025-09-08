import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../Components/axiosInstance";
import { User } from "./teamMember";

// Type Definitions


export interface BusinessOwner {
  uuid: string;
  user: User;
  business_name: string;
  business_license: string;
  contact_number: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

interface BusinessOwnerState {
  owner: BusinessOwner | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial State
const initialState: BusinessOwnerState = {
  owner: null,
  status: "idle",
  error: null,
};

// Async Thunk to Fetch Owner Info
export const fetchBusinessOwner = createAsyncThunk<
  BusinessOwner,
  void,
  { rejectValue: string }
>("businessOwner/fetchBusinessOwner", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("owners/me/"); // Change to your actual API endpoint
    return response.data as BusinessOwner;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch business owner");
  }
});

// Slice
const businessOwnerSlice = createSlice({
  name: "businessOwner",
  initialState,
  reducers: {
    clearBusinessOwner: (state) => {
      state.owner = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessOwner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBusinessOwner.fulfilled, (state, action: PayloadAction<BusinessOwner>) => {
        state.status = "succeeded";
        state.owner = action.payload;
      })
      .addCase(fetchBusinessOwner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { clearBusinessOwner } = businessOwnerSlice.actions;

export default businessOwnerSlice.reducer;

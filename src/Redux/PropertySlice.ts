import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../Components/axiosInstance";
import { User } from "./teamMember";
import { BusinessOwner } from "./OwnerDetail";
import { Agent } from "./agentSlice";

// Interfaces


export interface PropertyImage {
  image: string;
  property: number;
}

export interface Property {
  id: number;
  owner: string;
  owner_detail: BusinessOwner; 
  agents: number[];
  agents_detail: Agent[]; 
  title: string;
  images: PropertyImage[];
  description: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  living_rooms: number;
  square_meters: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedPropertyResponse {
  results: Property[];
  count: number;
  next: string | null;
  previous: string | null;
}

// State Interface
interface PropertyState {
  properties: Property[];
  count: number;
  next: string | null;
  previous: string | null;
  properties_status: "idle" | "loading" | "succeeded" | "failed";
  properties_error: string | null;
}

// Initial State
const initialState: PropertyState = {
  properties: [],
  count: 0,
  next: null,
  previous: null,
  properties_status: "idle",
  properties_error: null,
};

// Thunk with filters, search, and pagination
export const fetchProperties = createAsyncThunk<
  PaginatedPropertyResponse,
  {
    search?: string;
    filters?: {
      price?: number;
      bedrooms?: number;
      bathrooms?: number;
      location?: string;
      is_available?: boolean;
    };
    page?: number;
    page_size?: number;
  },
  { rejectValue: string }
>("properties/fetchProperties", async ({ search, filters = {}, page, page_size }, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (filters.price) params.append("price", filters.price.toString());
    if (filters.bedrooms) params.append("bedrooms", filters.bedrooms.toString());
    if (filters.bathrooms) params.append("bathrooms", filters.bathrooms.toString());
    if (filters.location) params.append("location", filters.location);
    if (filters.is_available !== undefined) params.append("is_available", filters.is_available.toString());

    if (page) params.append("page", page.toString());
    if (page_size) params.append("page_size", page_size.toString());

    const response = await axiosInstance.get(`/property/?${params.toString()}`);
    return response.data as PaginatedPropertyResponse;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch properties");
  }
});

// Slice
const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.properties_status = "loading";
      })
      .addCase(fetchProperties.fulfilled, (state, action: PayloadAction<PaginatedPropertyResponse>) => {
        state.properties_status = "succeeded";
        state.properties = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.properties_status = "failed";
        state.properties_error = action.payload || "Something went wrong";
      });
  },
});

export default propertySlice.reducer;

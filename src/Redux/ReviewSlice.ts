import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../Components/axiosInstance";

// Interfaces
export interface Review {
  uuid: string;
  property: number;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

// State Interface
interface ReviewState {
  reviews: Review[];
  review_status: "idle" | "review_loading" | "review_succeeded" | "review_failed";
  review_error: string | null;
}

// Initial State
const initialState: ReviewState = {
  reviews: [],
  review_status: "idle",
  review_error: null,
};

// Thunk to fetch reviews by property ID
export const fetchReviewsByProperty = createAsyncThunk<
  Review[],
  number,
  { rejectValue: string }
>("reviews/fetchReviewsByProperty", async (propertyId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/review/property/${propertyId}/`);
    return response.data as Review[];
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch reviews");
  }
});

// Slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByProperty.pending, (state) => {
        state.review_status = "review_loading";
      })
      .addCase(fetchReviewsByProperty.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.review_status = "review_succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByProperty.rejected, (state, action) => {
        state.review_status = "review_failed";
        state.review_error = action.payload || "Something went wrong";
      });
  },
});

export default reviewSlice.reducer;


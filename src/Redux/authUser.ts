import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../Components/axiosInstance";


interface UserState {
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    auth_user_status: "idle" | "loading" | "succeeded" | "failed";
    auth_user_error: string | null;
  }
  const initialState: UserState = {
    email: "",
    role: "",
    first_name: "",
    last_name: "",
    auth_user_status: "idle",
    auth_user_error: null,
  };

  export const fetchUser = createAsyncThunk<UserState,void,{rejectValue:string}>(
    'user/fetchUser',
    async (_, { rejectWithValue }) => {
        try{
            const response = await axiosInstance.get('auth/user/');
          
            return response.data as UserState;
        }
        catch(error: any){
            return rejectWithValue(error.response?.data||'failed to fetch user');
        }
    }
  );

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchUser.pending,(state) =>{
            state.auth_user_status = 'loading';
        })
        .addCase(fetchUser.fulfilled,(state,action: PayloadAction<UserState>) =>{
            state.auth_user_status = 'succeeded';
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
        })
        .addCase(fetchUser.rejected,(state,action) =>{
            state.auth_user_status = "failed";
            state.auth_user_error = action.payload as string
        });

    },
  }
  );
  export default  userSlice.reducer;
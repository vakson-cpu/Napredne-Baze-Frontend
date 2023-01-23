import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../Services/UserService";
import { STATUS } from "../Enums/StatusEnum";
import { Roles } from "../Enums/RoleEnum";
const initialState = {
  status:STATUS.IDLE,
  IsLoggedIn:false,
  Role:Roles.Guest

};


export const LogInUser = createAsyncThunk(
    "Users/login",
    async (payload, thunkAPI) => {
      try {
        return await UserService.LogIn(payload);
      } catch (error) {
        return "ERROR"
      }
    }
  );
export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
    signOut: (state) => {
      state.status = "idle";
      state.IsLoggedIn=false;
      state.Role=Roles.Guest;
      localStorage.clear();
    },
    signIn:(state,action)=>{

      state.status=STATUS.SUCCEDED;
      state.IsLoggedIn=true;
      state.Role=action.payload;
    }
  },
  extraReducers: {

    [LogInUser.pending]: (state, action) => {
      state.status = STATUS.PENDING;
    },
    [LogInUser.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.IsLoggedIn=false;
    },
    [LogInUser.fulfilled]: (state, action) => {
      if(action.payload.data === undefined)
      return
        state.status = STATUS.SUCCEDED;
        state.IsLoggedIn=true;
      
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetStatus, signOut,signIn } = AuthSlice.actions;
export default AuthSlice.reducer;

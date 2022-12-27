import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../Services/UserService";
import { STATUS } from "../Enums/StatusEnum";
const initialState = {
  status:STATUS.IDLE,
  IsLoggedIn:false

};


export const LogInUser = createAsyncThunk(
    "Users/register",
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
      localStorage.clear();
    },
  },
  extraReducers: {
    [LogInUser.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.IsLoggedIn=false;

    },
    [LogInUser.pending]: (state, action) => {
      state.status = STATUS.PENDING;
    },
    [LogInUser.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEDED;
      state.IsLoggedIn=true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetStatus, signOut } = AuthSlice.actions;
export default AuthSlice.reducer;

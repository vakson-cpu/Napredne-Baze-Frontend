import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../Services/UserService";
import { STATUS } from "../Enums/StatusEnum";
const initialState = {
  status:STATUS.IDLE,
  IsLoggedIn:false

};


export const RegionSlice = createSlice({
  name: "RegionSlice",
  initialState,
  reducers: {},
  extraReducers: {
  
  },
});

// Action creators are generated for each case reducer function

export default RegionSlice.reducer;

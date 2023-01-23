import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../Services/UserService";
import { STATUS } from "../Enums/StatusEnum";

const initialState = {
regionId:0,
status:STATUS.IDLE,
feedingGroundsIds:[]

};
export const GetWorkersInfo = createAsyncThunk(
  "Worker/GetInfo",
  async (userId) => {
    try {
      return await UserService.GetWorkersInfo(userId)
    } catch (error) {
      return "ERROR"
    }
  }
);

export const WorkerSlice = createSlice({
  name: "RegionSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [GetWorkersInfo.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
    },
    [GetWorkersInfo.pending]: (state, action) => {
      state.status = STATUS.PENDING;
    },
    [GetWorkersInfo.fulfilled]: (state, action) => {
      console.log("payloadddd",action)
      state.status=STATUS.SUCCEDED;
      state.regionId=action.payload.data.regionId;
      state.feedingGroundsIds=action.payload.data.feedingGrounds;
    },
  },
});

// Action creators are generated for each case reducer function
export default WorkerSlice.reducer;

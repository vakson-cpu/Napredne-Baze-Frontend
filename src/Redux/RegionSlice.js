import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../Enums/StatusEnum";
import { RegionService } from "../Services/RegionService";
const initialState = {
regions:[],
status:STATUS.IDLE

};
export const GetRegions = createAsyncThunk(
  "Regions/GetAll",
  async () => {
    try {
      return await RegionService.GetRegions();
    } catch (error) {
      return "ERROR"
    }
  }
);

export const RegionSlice = createSlice({
  name: "RegionSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [GetRegions.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
    },
    [GetRegions.pending]: (state, action) => {
      state.status = STATUS.PENDING;
    },
    [GetRegions.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEDED;
      state.regions=action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export default RegionSlice.reducer;

import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../Redux/AuthSlice'
import WorkerSlice from './WorkerSlice'
import RegionSlice from './RegionSlice'
export const store = configureStore({
  reducer: {
    AuthSlice,
    RegionSlice,
    WorkerSlice
  },
})
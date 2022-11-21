import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../Redux/AuthSlice'
import RegionSlice from './RegionSlice'
export const store = configureStore({
  reducer: {
    AuthSlice,
    RegionSlice
  },
})
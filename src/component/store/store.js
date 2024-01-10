import { configureStore } from '@reduxjs/toolkit'
import questionReducer from '../store/questionSlice'

export default configureStore({
  reducer: {
    que : questionReducer
  },
})
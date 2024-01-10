import { createSlice } from '@reduxjs/toolkit'

export const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
  },
  reducers: {
    addQuestions: (state, action) => {
      state.questions.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addQuestions } = questionSlice.actions

export default questionSlice.reducer
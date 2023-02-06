import { createSlice } from '@reduxjs/toolkit'

const initialState = 'ALL'

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(filter) {
      return {
        payload: filter,
      }
    }
  }
})

  export const { filterChange } = filterSlice.actions
  export default filterSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {},
})

export const { } = tasksSlice.actions

export default tasksSlice.reducer
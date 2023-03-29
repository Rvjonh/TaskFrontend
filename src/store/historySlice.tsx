import { createSlice } from '@reduxjs/toolkit'

import { TaskList } from './../interfaces/tasks';

let initialState: TaskList = {
    tasks: [],
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addTask(state, action) {
            state.tasks.push(action.payload);
        },
        resetTasks() {
            return initialState;
        }
    },
})

export const { addTask, resetTasks } = historySlice.actions

export default historySlice.reducer
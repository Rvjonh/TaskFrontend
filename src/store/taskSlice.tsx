import { createSlice } from '@reduxjs/toolkit'

import { TaskList } from './../interfaces/tasks';

let initialState: TaskList = {
    tasks: [],
};


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload;
        },
        addTask(state, action) {
            state.tasks.push(action.payload);
        },
        removeTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        },
        updateTask(state, action) {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
    },
})

export const { setTasks, addTask, removeTask, updateTask } = tasksSlice.actions

export default tasksSlice.reducer
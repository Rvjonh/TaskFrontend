import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './loginSlice';
import tasksReducer from './taskSlice';
import historyReducer from './historySlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        tasks: tasksReducer,
        history: historyReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;
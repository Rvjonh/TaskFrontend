import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './loginSlice';
import tasksReducer from './taskSlice';
import historyReducer from './historySlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        tasks: tasksReducer,
        history: historyReducer,
    }
})
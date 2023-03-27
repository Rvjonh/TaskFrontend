import { createSlice } from '@reduxjs/toolkit'

export interface MyLoginState {
    correo: string;
    identificador: string;
}

let initialState: MyLoginState = {
    correo: "",
    identificador: "",
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loadUser(state, action) {
            state.correo = action.payload.correo
            state.identificador = action.payload.identificador
        },
    },
})

export const { loadUser } = loginSlice.actions

export default loginSlice.reducer
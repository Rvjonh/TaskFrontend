import { createSlice } from '@reduxjs/toolkit'

export interface MyLoginState {
    correo: string;
    identificador: string;
}

let initialState: MyLoginState = {
    correo: "",
    identificador: "",
};

let initialStateReset: MyLoginState = Object.assign({}, initialState);

const session = localStorage.getItem('session');
if (session !== null) {
    initialState = JSON.parse(session);
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loadUser(state, action) {
            localStorage.setItem("session", JSON.stringify(action.payload))
            state.correo = action.payload.correo
            state.identificador = action.payload.identificador
        },
        logoutUser() {
            localStorage.setItem("session", JSON.stringify(initialStateReset))
            return initialStateReset
        },
    },
})

export const { loadUser, logoutUser } = loginSlice.actions

export default loginSlice.reducer
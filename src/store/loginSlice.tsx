import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        nombre: "",
        correo: "",
        identificador: ""
    },
    reducers: {},
})

export const { } = loginSlice.actions

export default loginSlice.reducer
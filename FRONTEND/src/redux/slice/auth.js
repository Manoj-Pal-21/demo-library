import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
        },
        resetAuth(state) {
            state = initialState
        }
    },
});

export const { setUser, logout, resetAuth } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;

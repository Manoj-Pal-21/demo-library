import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    requests: [],
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setRequests(state, action) {
            state.requests = action.payload;
        },
        addRequest(state, action) {
            state.requests.push(action.payload);
        },
        deleteRequest(state, action) {
            state.requests = state.requests.filter(request => request.id !== action.payload);
        },
        resetRequests(state) {
            state.requests = [];
        }
    },
});

export const { setRequests, addRequest, deleteRequest, resetRequests } = transactionSlice.actions;

export const selectRequests = (state) => state.transactions.requests;

export default transactionSlice.reducer;

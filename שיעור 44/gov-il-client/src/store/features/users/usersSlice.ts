import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUsersApi, type UserClient } from "../../../components/pages/carsPage/service/getUsersApi";

type UsersState = {
    currentUser: UserClient | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: UsersState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const fetchCurrentUser = createAsyncThunk("user/fetch", async () => {
    const response = await getUsersApi();
    return response;
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<UserClient>) => {
                state.currentUser = action.payload;
                state.isLoading = false;
                console.log(action.payload);
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.isLoading = false;
                state.error = "Error getting user";
            });
    },
});

//export const { addToFavorites, removeFromFavorites, addCarsForSale } = carSlice.actions;

export default userSlice.reducer;

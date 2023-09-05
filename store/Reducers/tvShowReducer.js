import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    TvShows: [],
    TvShowsDetails: {}
}

export const TvShowReducer = createSlice({
    name: 'TvShows',
    initialState,
    reducers: {
        saveTvShows: (state,action) => {
            state.TvShows = action.payload
        },
        saveTvShowsDetails: (state,action) => {
            state.TvShowsDetails = action.payload
        }
    }
}) 

export const {saveTvShows,saveTvShowsDetails} = TvShowReducer.actions
export default TvShowReducer.reducer
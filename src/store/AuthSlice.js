import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    FileId:null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.FileId=null;
        },
        imageid:(state,action)=>{
            state.FileId=action.payload.FileId
        }
     }
})

export const {login, logout,imageid} = authSlice.actions;

export default authSlice.reducer;

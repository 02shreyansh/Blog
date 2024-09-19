import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from './authSlice.js';

const store = configureStore({
    reducer: {
        auth : AuthSlice,
    }
});


export default store;

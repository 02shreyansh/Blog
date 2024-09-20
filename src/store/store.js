import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from '../store/authSlice'

const store = configureStore({
    reducer: {
        auth : AuthSlice,
    }
});


export default store;

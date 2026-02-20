import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './Slices/authSlice';
import { projectReducer } from './Slices/projectSlice';
import { categoryReducer } from './Slices/categorySlice';
import { messageReducer } from './Slices/messageSlice';
import { userReducer } from './Slices/userSlice';
import { cvFileReducer } from './Slices/cvFileSlice';
import { passwordReducer } from './Slices/passwordSlice';

const store = configureStore({
    reducer:{
        auth:authReducer,
        project:projectReducer,
        category:categoryReducer,
        message:messageReducer,
        user:userReducer,
        cvFile:cvFileReducer,
        password:passwordReducer,
    }
});

export default store;
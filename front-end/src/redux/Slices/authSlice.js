import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:localStorage.getItem("userInfo")?
        JSON.parse(localStorage.getItem("userInfo")):null,
        registerMessage:null,
        isEmailVerified:false,


    },
    reducers:{
        Login(state,action){
            state.user= action.payload;
        }
        ,
        Logout(state){
            state.user= null;
        }
        ,
        register(state,action){
            state.registerMessage = action.payload; 
        },
        setIsEmailVerified(state){
            state.isEmailVerified =true;
            state.registerMessage = null;
        }
    }


});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export {authActions,authReducer}
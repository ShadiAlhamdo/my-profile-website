import {createSlice} from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name:"message",
    initialState:{
       messages:[],
      messagesCount:null,
     


    },
    reducers:{
     setMessages(state,action){
        state.messages=action.payload 
     },
      setMessagesCount(state,action){
        state.messagesCount=action.payload 
     },
      
    }


});

const messageReducer = messageSlice.reducer;
const messageActions = messageSlice.actions;

export {messageActions,messageReducer}
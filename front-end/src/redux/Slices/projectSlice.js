import {createSlice} from '@reduxjs/toolkit'

const projectSlice = createSlice({
    name:"project",
    initialState:{
       projects:[],
       projectsCount:null,
       projectCate:[],


    },
    reducers:{
     setProjects(state,action){
        state.projects=action.payload 
     },
      setProjectsCount(state,action){
        state.projectsCount=action.payload 
     },
      setProjectsCate(state,action){
        state.projectCate=action.payload 
     }
    }


});

const projectReducer = projectSlice.reducer;
const projectActions = projectSlice.actions;

export {projectActions,projectReducer}
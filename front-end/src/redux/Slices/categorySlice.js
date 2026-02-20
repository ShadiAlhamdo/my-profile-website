import {createSlice} from '@reduxjs/toolkit'

const categorySlice = createSlice({
    name:"category",
    initialState:{
       categories:[],
       categoriesCount:null,
     


    },
    reducers:{
     setCategories(state,action){
        state.categories=action.payload 
     },
      setCategoriesCount(state,action){
        state.categoriesCount=action.payload 
     },
      
    }


});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export {categoryActions,categoryReducer}
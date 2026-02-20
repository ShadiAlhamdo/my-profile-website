
import { toast } from "react-toastify";
import {categoryActions} from "../Slices/categorySlice"
import request from '../../utils/request'




// Fetch All Category 
export function fetchCategories(){
 
    return async (dispatch)=>{
        
        try {
            const {data} = await request.get("/api/categories");
            
            dispatch(categoryActions.setCategories(data));
           

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//   Create Category
export function createCategory(categoryData) {
  return async (dispatch,getState) => {
    const {auth} = getState();
    try {
      await request.post("/api/categories", categoryData,{
        headers:{
          Authorization: "Bearer " + auth.user.token,
        }
      });
      toast.success("Category created successfully");
      dispatch(fetchCategories());
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

// Delete Category
export function deleteCategory(categoryId) {
  return async (dispatch,getState) => {
    const {auth} = getState();
    try {
      await request.delete(`/api/categories/${categoryId}`,{
        headers:{
          Authorization: "Bearer " + auth.user.token,
        }
      });
      toast.success("Category deleted successfully");
      dispatch(fetchCategories());
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}


// Categories Count
export function fetchCategoriesCount() {
  return async (dispatch,getState) => {
    const {auth} = getState();
    try {
      const { data } = await request.get("/api/categories/count",{
        headers:{
          Authorization: "Bearer " + auth.user.token,
        }
      });
      dispatch(categoryActions.setCategoriesCount(data.count));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}
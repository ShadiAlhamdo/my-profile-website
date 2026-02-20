import { toast } from "react-toastify";
import {projectActions} from "../Slices/projectSlice"
import request from '../../utils/request'




// Fetch All Project 
export function fetchAllProjects(){
 
    return async (dispatch)=>{
        
        try {
            const {data} = await request.get("/api/projects");
            
            dispatch(projectActions.setProjects(data));
           

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// Fetch All Project Based On Category Name
export function fetchProjectBaseOnCategory(categoryName) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `/api/projects?category=${categoryName}`
      );

      dispatch(projectActions.setProjects(data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load projects");
    }
  };
}
// Fetch Singel Project By Id
export function fetchSingleProject(projectId, setProject, setLoading) {
  return async () => {
    try {
      setLoading(true);
      const { data } = await request.get(`/api/projects/${projectId}`);
      setProject(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to load project");
    }
  };
}
// fetch Project Count
export function fetchProjectsCount() {
  return async (dispatch,getState) => {
    const {auth} = getState();
    try {
      const { data } = await request.get("/api/projects/count",{
        headers:{
          Authorization: "Bearer " + auth.user.token,
        }
      });
      dispatch(projectActions.setProjectsCount(data.count));
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load count");
    }
  };
}

// Create New Project
export function createProject(projectData, image, navigate) {
  return async (dispatch, getState) => {
    const { auth } = getState();

    try {
      const formData = new FormData();

      formData.append("title", projectData.title);
      formData.append("category", projectData.category);
      formData.append("githubLink", projectData.githubLink);
      formData.append("liveDemo", projectData.liveDemo);
      formData.append("description", projectData.description);
      formData.append(
        "techStack",
        JSON.stringify(projectData.techStack)
      );
      formData.append("image", image);

      await request.post("/api/projects", formData, {
        headers: {
          Authorization: "Bearer " + auth.user.token,
        },
      });

      toast.success("Project created successfully 🚀");
      dispatch(fetchAllProjects());
      navigate("/"); // أو أي صفحة بدك
    } catch (error) {
      toast.error(error?.response?.data?.message || "Create project failed");
    }
  };
}
//  Update Project Data
// Update Project Data
export function updateProject(projectId, updatedData, setProject, setUpdateProject) {
  return async (dispatch, getState) => {
    const { auth } = getState();

    try {
      const { data } = await request.put(
        `/api/projects/${projectId}`,
        updatedData,
        {
          headers: {
            Authorization: "Bearer " + auth.user.token,
          },
        }
      );

      toast.success("Project updated successfully");

      // ✅ تحديث المشروع المعروض مباشرة
      setProject(data.data);

      // ✅ إغلاق المودال
      setUpdateProject(false);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };
}

//   Update Project Image
export function updateProjectImage(projectId, imageData) {
  return async (dispatch,getState) => {
            const state=getState();
    try {
      await request.put(
        `/api/projects/${projectId}/image`,
        imageData,
        {
          headers: {
             Authorization:"Bearer " + state.auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Project image updated");
      dispatch(fetchAllProjects());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Image update failed");
    }
  };
}

// Delete Project
export function deleteProject(projectId) {
  return async (dispatch,getState) => {
       const state=getState();
    try {
      await request.delete(`/api/projects/${projectId}`,{
        headers:{
                         Authorization:"Bearer " + state.auth.user.token,

        }
      });

      toast.success("Project deleted successfully");
      dispatch(fetchAllProjects());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };
}


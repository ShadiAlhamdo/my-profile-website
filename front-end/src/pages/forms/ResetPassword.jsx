import React,{useEffect, useState}  from "react";
import {toast, ToastContainer} from "react-toastify"
import {useDispatch,useSelector} from "react-redux"
import {useParams,useNavigate} from "react-router-dom"
import { getResetPassword, resetPassword } from "../../redux/ApiCalls/passwordApiCall";

const ResetPassword = () => {
const dispatch=useDispatch();
const {isError}=useSelector((state)=>state.password);
const navigate=useNavigate();
const {userId,token}=useParams();
const [password,setPassword]=useState("");

useEffect(()=>{
    if(userId && token){
        dispatch(getResetPassword(userId,token));
    }
},[userId, token, dispatch])

// FormSubmitHandler
const formSubmitHandler=(e)=>{
    e.preventDefault();
    if(password.trim()==="") return toast.error("Password Is Required");

    dispatch(resetPassword(password,{userId,token}));
    setPassword("");
    navigate("/login");
    
}

    return (
        <section className="form-container">
            <ToastContainer theme="colored" position="top-center"/>
            <h1 className="form-title">Reset Password</h1>
            {isError ? 
            (<p className="error">Invalid Link</p>) 
            : 
            (
            <form onSubmit={formSubmitHandler} className="form">
                
                <div className="form-group">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input type="password" id="password"value={password}  onChange={(e)=>setPassword(e.target.value)}
                     className="form-input" placeholder="Enter Your New Password" />
                </div>
                <button type="submit" className="form-btn">Submit</button>
            </form>
                )}
            

        </section>
    );

}

export default ResetPassword;
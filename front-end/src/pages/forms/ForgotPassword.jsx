import React,{useState}  from "react";
import {toast, ToastContainer} from "react-toastify"
import {useDispatch} from "react-redux"
import { forgotPassword } from "../../redux/ApiCalls/passwordApiCall";
const ForgotPassword = () => {

const dispatch=useDispatch();
const [email,setEmail]=useState("");


// FormSubmitHandler
const formSubmitHandler=(e)=>{
    e.preventDefault();
    if(email.trim()==="") return toast.error("Email Is Required");

    dispatch(forgotPassword(email));
}

    return (
        <section className="form-container">
            <ToastContainer theme="colored" position="top-center"/>
            <h1 className="form-title">Forgot Password </h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" value={email}  onChange={(e)=>setEmail(e.target.value)}className="form-input" placeholder="Enter Your Email" />
                </div>  
                <button type="submit" className="form-btn">Submit</button>
            </form>
        </section>
    );

}

export default ForgotPassword;
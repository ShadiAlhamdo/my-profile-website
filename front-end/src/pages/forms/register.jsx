import React,{useState}  from "react";
import { useDispatch , useSelector} from "react-redux";
import { Link  , useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"
import { registerUser } from "../../redux/ApiCalls/authApiCall";
import {authActions} from '../../redux/Slices/authSlice'
import swal from "sweetalert";
const Register = () => {

const dispatch = useDispatch();
const {registerMessage} = useSelector(state=>state.auth);
    
const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


// FormSubmitHandler
const formSubmitHandler=(e)=>{
    e.preventDefault();
    if(username.trim()==="") return toast.error("Usename Is Required");
    if(email.trim()==="") return toast.error("Email Is Required");
    if(password.trim()==="") return toast.error("Password Is Required");

    dispatch(registerUser({username,email,password}));
}

const navigate = useNavigate();

if(registerMessage){
    swal({
        title:registerMessage,
        icon:"success"
    }).then(isOk =>{
        if(isOk){
            // Go To Login Page
            navigate("/login")
            dispatch(authActions.register(null));
        }
    })
}

    return (
        <section className="form-container">
            <ToastContainer theme="colored" position="top-center"/>
            <h1 className="form-title">Create New Account</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-input" placeholder="Enter Your Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" value={email}  onChange={(e)=>setEmail(e.target.value)}className="form-input" placeholder="Enter Your Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password"value={password}  onChange={(e)=>setPassword(e.target.value)} className="form-input" placeholder="Enter Your Password" />
                </div>
                <button type="submit" className="form-btn">Register</button>
            </form>
            <div className="form-footer">
                Already Have An Account ? <Link to={"/login"}>Login</Link>
            </div>
        </section>
    );

}

export default Register;
import { BrowserRouter , Routes, Route ,Navigate } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Header from './Components/Header/Header';
import AdminDashboard from "./pages/Admin/AdminDashboard"
import Register from './pages/forms/register';
import Login from './pages/forms/login';
import CreateProject from './pages/creat-project/createProject'
import ProjectDetails from './pages/project-details/projectDetails';
// Css Styles
import './App.css';
import "animate.css/animate.compat.css"
import Footer from './Components/Footer/Footer';
import UsersTabel from './pages/Admin/UsersTabel';
import ProjectTabel from './pages/Admin/ProjectTabel';
import CategoriesTabel from './pages/Admin/CategoriesTabel';
import MessagesTabel from './pages/Admin/MessagesTabel,';
import CvFileTabel from './pages/Admin/CvFileTabel';
import ForgotPassword from './pages/forms/ForgotPassword';
import ResetPassword from './pages/forms/ResetPassword';
import NotFound from './pages/not-found/NotFound';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import VerifyEmail from './pages/verifyEmail/verifyEmail';
import Categories from './pages/Categories/Categories';


function App() {
  const {user} = useSelector(state => state.auth)
  return (
    <BrowserRouter className="App">
      <ToastContainer theme='colored' position='top-center'/>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/admin" element={user?.isAdmin ?<AdminDashboard/>:<Navigate to={"/"}/>}/>
          <Route path="/admin/users-tabel" element={user?.isAdmin ?<UsersTabel/>:<Navigate to={"/"}/>}/>
          <Route path="/admin/projects-tabel" element={user?.isAdmin ?<ProjectTabel/>:<Navigate to={"/"}/>}/>
          <Route path='/admin/categories-tabel' element={user?.isAdmin ?<CategoriesTabel/>:<Navigate to={"/"}/>}/>
          <Route path='/admin/messages-tabel' element={user?.isAdmin ?<MessagesTabel/>:<Navigate to={"/"}/>}/>
          <Route path='/admin/cv-tabel' element={user?.isAdmin ?<CvFileTabel/>:<Navigate to={"/"}/>}/>
          <Route path="/admin/create-project" element={user?.isAdmin ?<CreateProject/>:<Navigate to={"/"}/>}/>
          <Route path="/project-details/:id" element={<ProjectDetails/>}/>
          <Route path="/login" element={!user ?<Login/>:<Navigate to={"/"}/>}/>
          <Route path="/register" element={!user ?<Register/>:<Navigate to={"/"}/>}/>
          <Route path="/users/:userId/verify/:token" element={!user ?<VerifyEmail/>:<Navigate to={"/"}/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:userId/:token" element={<ResetPassword/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="*" element={<NotFound/>}/>

        </Routes>

      
        <Footer/>
    </BrowserRouter>
  );
}

export default App;

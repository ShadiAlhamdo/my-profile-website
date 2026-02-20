
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar">
           <Link to="/admin" className="admin-sidebar-title">
                <i className="fa-solid fa-bars"></i>
                Dashboard
           </Link>
            <ul className="admin-dashboard-list">
                <Link className='admin-sidebar-link' to="/admin/users-tabel" >
                    <i className="fa-solid fa-users"></i>
                    Users
                </Link>
                <Link  className='admin-sidebar-link'  to="/admin/categories-tabel" >
                    <i className="fa-solid fa-layer-group"></i>
                    Categories
                </Link>
                 <Link   className='admin-sidebar-link' to="/admin/projects-tabel" >
                    <i className="fa-solid fa-box-archive"></i>
                    Projects
                </Link>
                <Link  className='admin-sidebar-link'  to="/admin/messages-tabel" >
                   <i className="fa-regular fa-message"></i>
                    Messages
                </Link>
                <Link className='admin-sidebar-link' to="/admin/cv-tabel" >
                   <i className="fa-solid fa-file"></i>
                    CV FILE
                </Link>
            </ul>
            
        </div>
    );
};

export default AdminSidebar;

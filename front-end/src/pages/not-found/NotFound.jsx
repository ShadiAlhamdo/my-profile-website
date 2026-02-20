import { Link } from "react-router-dom"

const NotFound =()=>{
    return(
        <div className="not-found">
            <div className="not-found-title">
                404
            </div>
            <h1 className="not-found-text">Page Not Found</h1>
            <Link to={"/"} className="not-found-link">GO TO Home Page</Link>
        </div>

    )
}

export default NotFound;
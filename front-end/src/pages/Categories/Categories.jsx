import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

const Categories =()=>{
    const dispatch = useDispatch();
    const {categories} = useSelector((state) => state.category);

    useEffect(()=>{
        console.log("Categories page loaded");
    },[])
    return(
        <div className="Categories">
            <div className="Categories-title">
                All Categories
            </div>
            <div className="categories-item">
                {categories.map((category) => (
                    <div className="categories-item-title" key={category.id}>
                        {category.name}
                    </div>
                ))}
            </div>
            <Link to={"/"} className="not-found-link">GO TO Home Page</Link>
        </div>

    )
}

export default Categories;
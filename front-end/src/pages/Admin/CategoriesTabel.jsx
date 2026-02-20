import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import AdminSidebar from "./AdminSidebar";
import {
   fetchCategories as fetchAllCategories,
  deleteCategory,
} from "../../redux/ApiCalls/categoryApicall";

const CategoriesTabel = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // ✅ Delete Category Handler
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(categoryId));
      }
    });
  };

  return (
    <section className="tabel-container">
      <AdminSidebar />

      <div className="tabel-wrapper">
        <h1 className="tabel-title">Categories</h1>

        <table className="tabel">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>

                <td>
                  <b>{category.title}</b>
                </td>

                <td>
                  <div className="tabel-button-group">
                    <button
                      onClick={() =>
                        deleteCategoryHandler(category._id)
                      }
                    >
                      Delete Category
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="3">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CategoriesTabel;

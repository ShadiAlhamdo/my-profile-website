import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createCategory } from "../../redux/ApiCalls/categoryApicall";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      return toast.error("Category Title Is Required");
    }

    dispatch(createCategory({ title }));
    setTitle("");
  };

  return (
    <div className="add-category">
      <ToastContainer theme="colored" position="top-center" />

      <h6 className="add-category-title">Add New Category</h6>

      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="title">Category Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Category Title"
          />
        </div>

        <button type="submit" className="add-category-btn">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;

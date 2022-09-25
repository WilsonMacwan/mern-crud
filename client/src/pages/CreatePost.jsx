import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function CreatePost() {
  const initialState = {
    title: "",
    category: "",
    description: "",
  };

  const [post, setPost] = useState(initialState);

  const onChangeHandler = (e) => {
    console.log("Post event", e);
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category } = post;
    const data = {
      title: title,
      description: description,
      postCategory: category,
    };
    try {
      const res = await axios.post("/posts/add", data);
      const result = await res.data;
      if (result.success) {
        setPost({ title: "", description: "", category: "" });
        toast.success("Post Created Successfully..");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link type="button" className="btn btn-success btn-sm m-1" to="/">
        Go Back
      </Link>
      <h3>Create New Post</h3>

      <div>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="title" className="form-label">
              Post Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              placeholder="Title"
              value={post.title}
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="category" className="form-label">
              Post Category
            </label>
            <input
              type="text"
              name="category"
              className="form-control"
              id="category"
              placeholder="Category"
              value={post.category}
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Post Description
            </label>
            {/* <input
              type="text"
              name="description"
              className="form-control"
              id="description"
              placeholder="Write Description.."
              value={post.description}
              onChange={onChangeHandler}
            /> */}
            <CKEditor
              editor={ClassicEditor}
              data={post.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setPost({ ...post, description: data });
              }}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Add Post
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose="1000" theme="dark" />
    </div>
  );
}

export default CreatePost;

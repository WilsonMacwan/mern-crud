import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditPost() {
  const initialState = {
    title: "",
    category: "",
    description: "",
  };

  const [post, setPost] = useState(initialState);
  const { id } = useParams();

  console.log("post", post);

  const getPost = async () => {
    try {
      const res = await axios.get(`/posts/details/${id}`);
      const result = await res.data;
      if (result.success) {
        setPost({
          title: result.post.title,
          description: result.post.description,
          category: result.post.postCategory,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    getPost();
  }, [getPost]);

  const onChangeHandler = (e) => {
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
      const res = await axios.put(`/posts/update/${id}`, data);
      const result = await res.data;
      if (result.success) {
        alert("Post Updated Successfully...");
        // setPost({ title: "", description: "", category: "" });
        return result;
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
      <h3>Edit Post</h3>

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
                // console.log({ event, editor, data });
                setPost({ ...post, description: data });
              }}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;

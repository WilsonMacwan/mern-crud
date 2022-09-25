import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function Home() {
  const initialState = [];
  const [posts, setPosts] = useState(initialState);

  const [q, setQ] = useState("");
  const [searchParam] = useState(["title", "description", "postCategory"]);

  const getPosts = async () => {
    try {
      const res = await axios.get("/posts");
      const result = await res.data;

      if (result.success) {
        setPosts(result.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await axios.delete(`/posts/delete/${id}`);
      // alert(`${res.data.title} Deleted Successfully...`);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete post
  const confirmDelete = (id, title) => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you wan't to delete ${title} ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deletePost(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const filteredPosts = (posts) => {
    return posts.filter((post) => {
      return searchParam.some((newPost) => {
        return (
          post[newPost].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  return (
    <div>
      <h3>Post List</h3>
      <div className="d-flex justify-content-end">
        <div className="d-flex col-md-4">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Post..."
            aria-label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {/* <button className="btn btn-outline-success" type="submit">
            Search
          </button> */}
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            filteredPosts(posts).map((post, index) => {
              const { _id, title, description, postCategory } = post;
              return (
                <tr key={_id}>
                  <th scope="row">{index}</th>
                  <td>
                    <Link to={`details/${_id}`}>{title}</Link>
                  </td>
                  <td dangerouslySetInnerHTML={{ __html: description }} />
                  <td>{postCategory}</td>
                  <td>
                    <Link
                      type="button"
                      to={`/edit/${_id}`}
                      className="btn btn-warning btn-sm m-1"
                    >
                      Edit
                    </Link>
                    |
                    <Link
                      type="button"
                      to=""
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => confirmDelete(_id, title)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <div>
              <h3>No Post</h3>
            </div>
          )}
        </tbody>
      </table>
      <Link type="button" to="/add" className="btn btn-success btn-sm m-1">
        Add New Post
      </Link>
    </div>
  );
}

export default Home;

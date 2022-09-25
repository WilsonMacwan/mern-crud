import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();

  const initialState = {};
  const [postDetail, setPostDetail] = useState(initialState);
  const { title, description, postCategory } = postDetail;

  const getPostDetails = async () => {
    try {
      const res = await axios.get(`/posts/details/${id}`);
      const result = await res.data;
      if (result.success) {
        setPostDetail(result.post);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Link type="button" className="btn btn-success btn-sm m-1" to="/">
        Go Back
      </Link>

      <h3>Post Details</h3>
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-body">
          <h5 className="card-title">Post Title : {title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Post Category : {postCategory}
          </h6>
          <p className="card-text">
            Post Description :
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;

import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function BlogDetails(props) {
  const [blog, setBlog] = React.useState([]);
  const [isPending, setIsPending] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/blogs/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBlog(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [id]);

  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${id})`, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}{" "}
      {blog.map((blog, index) => (
        <article key={index}>
          <h2>Title: {blog.title}</h2>
          <p>Written by: {blog.author}</p>
          <div>Blog: {blog.body}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      ))}
    </div>
  );
}

export default BlogDetails;

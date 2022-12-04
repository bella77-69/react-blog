import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [blog, setBlog] = useState({
    id: "",
    title: "",
    body: "",
    author: "",
    date: "", 
  });
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setBlog((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      setIsPending(false);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input
          type="text"
          required
          value={blog.title}
          id="title"
          onChange={handleChange}
        />
        <label>Blog Body:</label>
        <textarea
          required
          value={blog.body}
          id="body"
          onChange={handleChange}
        />
             <label>Blog Date:</label>
        <input
          required
          value={blog.date}
          id="date"
          onChange={handleChange}
        />
        <label>Blog author:</label>
        <input
          type="text"
          value={blog.author}
          id="author"
          onChange={handleChange}
        />
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog</button>}
      </form>
    </div>
  );
};

export default Create;

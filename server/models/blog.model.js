const db = require("../config/db.config");

const Blog = function (blog) {
  this.title = blog.title;
  this.body = blog.body;
  this.author = blog.author;
};

//get all blogs
Blog.getAllBlogs = (result) => {
  db.query("SELECT * FROM blogs", (err, res) => {
    if (err) {
      console.log("Error while fetching blogs", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//get blog by id
Blog.getBlogById = (id, result) => {
  db.query("SELECT * FROM blogs WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching blog by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//create blog
Blog.createBlog= (blogReqData, result) => {
  db.query(
    "INSERT INTO blogs SET ?",
    blogReqData,
    (err, res) => {
      if (err) {
        console.log("Error while inserting data");
        result(null, err);
      } else {
        console.log("Blog created successfully");
        result(null, res);
      }
    }
  );
};


//update blog
Blog.updateBlog = (id, blog, result) => {
  db.query(
    "UPDATE blogs SET title = ?, body = ?, author = ? WHERE id = ?",
    [blog.title, blog.body, blog.author, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Updated blog: ", { id: id, ...blog });
      result(null, { id: id, ...blog });
    }
  );
};

//delete blog
Blog.deleteBlog = (id, result) => {
  db.query("DELETE FROM blogs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted blog with id: ", id);
    result(null, res);
  });
};

module.exports = Blog;

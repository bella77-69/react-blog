const blogModel = require("../models/blog.model");

//get all blogs
exports.getAllBlogs = (req, res) => {
  blogModel.getAllBlogs((err, user) => {
    if (err) res.send(err);
    res.send(user);
  });
};

//get blog by id
exports.getBlogById = (req, res) => {
  blogModel.getBlogById(req.params.id, (err, user) => {
    if (err) res.send(err);

    res.send(user);
  });
};

//create blog
exports.createBlog = (req, res) => {
  const blogReqData = new blogModel(req.body);
  console.log("blogReqData", blogReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    blogModel.createBlog(blogReqData, (err, user) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Blog Created Successfully",
        data: user.id,
      });
    });
  }
};

//update blog
exports.updateBlog = (req, res) => {
  const blogReqData = new blogModel(req.body);
  //  console.log("adminReqData update", adminReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    blogModel.updateBlog(req.params.id, blogReqData, (err, user) => {
      if (err) res.send(err);
      res.json({ status: true, message: "Blog updated Successfully" });
    });
  }
};

//delete blog
exports.deleteBlog = (req, res) => {
  blogModel.deleteBlog(req.params.id, (err, user) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Blog deleted successully!" });
  });
};

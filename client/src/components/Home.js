import BlogList from "./BlogList";
import axios from "axios";
// const Home = () => {
//     const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs');

//     return (
//         <div className="home">
//             {error && <div>{error}</div>}
//             {isPending && <div>Loading...</div>}
//             <BlogList blogs={blogs} title="All Blogs"/>
//         </div>
//      );
// }

// export default Home;

import React, { Component } from "react";

class Home extends Component {
  state = {
    blogs: [],
    blogsId: [],
    activeBlog: {},
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/blogs")
      .then((response) => {
        console.log(response);
        this.setState({
          blogs: response.data,
          blogsId: response.data.map((blog) => blog.id),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getBlogById = (id) => {
    axios
      .get(`http://localhost:8000/blogs/${id}`)
      .then((response) => {
        console.log(response);
        this.setState({
          activeBlog: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.blogsId !== this.state.blogsId) {
      const id = this.state.blogsId[0];
      this.getBlogById(id);
    }
  }

  render() {
    return (
      <div className="home">
        <BlogList blogs={this.state.blogs} title="All Blogs" blogsId={() => this.state.blogsId}/>
      </div>
    );
  }
}

export default Home;

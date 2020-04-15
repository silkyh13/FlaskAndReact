import React from "react";
import BlogPosts from "./BlogPosts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this.get();
  }

  get = () => {
    fetch("/find")
      .then(function (response) {
        return response.json();
      })
      .then((result) => {
        this.setState({ posts: result });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };
  add = (e) => {};
  delete = (e) => {
    let id = e.target.id;
    return fetch("/delete" + "/" + id, {
      method: "delete",
    }).then((response) => {
      response.json();
      this.get();
    });
  };

  edit = (e) => {
    let id = e.target.id;
    console.log("edit", id);
  };
  render() {
    return <div className="App"></div>;
  }
}

export default App;

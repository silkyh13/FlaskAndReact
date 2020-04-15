import React from "react";
import "./App.css";
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
    return (
      <div className="App">
        <div className="txn">
          <div className="txn-table">
            <div className="txn-header txn-row">
              <div className="txn-data">Topic</div>
              <div className="txn-data">Post</div>
              <div className="txn-data">Date</div>
              <div className="txn-data">Delete</div>
            </div>
          </div>
          <BlogPosts
            data={this.state.posts}
            edit={this.edit}
            onClick={this.delete}
          />
        </div>
        <div className="add-data" onClick={this.add}>
          &#43;
        </div>
      </div>
    );
  }
}

export default App;

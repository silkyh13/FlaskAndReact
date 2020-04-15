import React from "react";
// import BlogPosts from "./BlogPosts";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@material-ui/core";
import MaterialTable from "material-table";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      columns: [
        { title: "Topic", field: "topic" },
        { title: "Content", field: "content" },
      ],
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
        this.setState({ rows: result });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };
  delete = (e) => {
    let topic = e.topic;
    return fetch("/delete" + "/" + topic, {
      method: "delete",
    }).then((response) => {
      response.json();
      this.get();
    });
  };
  add = (data) => {
    fetch("/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        this.get();
        return res.json();
      })
      .then(function (data) {
        alert(JSON.stringify(data));
      });
  };
  edit = (someData) => {
    fetch("/put", {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(someData),
    }).then((response) => {
      response.json();
      this.get();
    });
  };
  render() {
    return (
      <Box display="flex" justifyContent="center">
        <Box border="groove" width="60vw" mt="100px">
          <MaterialTable
            title="Blog Post"
            columns={this.state.columns}
            data={this.state.rows}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    this.add(newData);
                  }, 600);
                }),
              onRowDelete: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    this.delete(newData);
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      console.log(newData);
                      this.edit(newData);
                    }
                  }, 600);
                }),
            }}
          />
        </Box>
      </Box>
    );
  }
}

export default App;

{
  /* <TableHead>
<TableHead>
  <TableRow>
    <TableCell>Topic</TableCell>
    <TableCell align="right">Content</TableCell>
    <TableCell align="right">Date</TableCell>
  </TableRow>
</TableHead>
{this.state.rows.map((row) => (
  <TableRow>
    <TableCell component="th" scope="row">
      {row.topic}
    </TableCell>
    <TableCell align="right">{row.content}</TableCell>
    <TableCell align="right">{row.created_at}</TableCell>
  </TableRow>
))}
</TableHead> */
}

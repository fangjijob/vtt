import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { UserContext } from "./UserProvider";

class Users extends Component {
  static contextType = UserContext;

  render() {
    const { allUsers, correct } = this.props;

    const usersList = allUsers
      .sort((a, b) => {
        if (new Date(a.createdAt) < new Date(b.createdAt)) {
          return -1;
        }
        if (new Date(a.createdAt) > new Date(b.createdAt)) {
          return 1;
        }
        return 0;
      })
      .map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell align="left">{item.name}</TableCell>
            <TableCell align="left">{item.answer}</TableCell>
            <TableCell align="left">
              {item.correct === null ? null : item.correct.toString()}
            </TableCell>
            <TableCell align="left">
              <Button
                variant="contained"
                color="primary"
                id={item.id}
                disabled={this.context.displayName !== "Calvin Fang"}
                onClick={() => {
                  correct(item.id, true);
                }}
              >
                True
              </Button>
              <Button
                variant="contained"
                color="secondary"
                id={item.id}
                disabled={this.context.displayName !== "Calvin Fang"}
                onClick={() => {
                  correct(item.id, false);
                }}
              >
                False
              </Button>
            </TableCell>
          </TableRow>
        );
      });

    return (
      <Table size="small" align="center">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Answer</TableCell>
            <TableCell align="center">Correct?</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{usersList}</TableBody>
      </Table>
    );
  }
}

export default Users;

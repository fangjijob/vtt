import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { UserContext } from "./UserProvider";

class Manager extends Component {
  static contextType = UserContext;

  render() {
    const { pause, deleteAll } = this.props;

    return (
      <Box align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            pause();
          }}
          disabled={this.context.displayName !== "Calvin Fang"}
        >
          Pause
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            deleteAll();
          }}
          disabled={this.context.displayName !== "Calvin Fang"}
        >
          Restart
        </Button>
      </Box>
    );
  }
}
export default Manager;

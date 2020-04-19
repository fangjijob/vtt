import React, { Component, createContext } from "react";
import firebase from "./Firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Button from "@material-ui/core/Button";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  state = {
    user: null,
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((u) => {
      this.setState({ user: u });
    });
  };

  render() {
    if (!!this.state.user) {
      return (
        <UserContext.Provider value={this.state.user}>
          <div align="right">
            {this.state.user.displayName}
            <Button
              variant="contained"
              color="primary"
              onClick={() => firebase.auth().signOut()}
            >
              Sign out
            </Button>
          </div>
          {this.props.children}
        </UserContext.Provider>
      );
    } else {
      return (
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      );
    }
  }
}
export default UserProvider;

import React from "react";
import Users from "./Users";
import AddUser from "./AddUser";
import Manager from "./Manager";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import "./App.css";
import firebase from "./Firebase";
import UserProvider from "./UserProvider";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref1 = firebase.firestore().collection("answer");
    this.ref2 = firebase.firestore().collection("manager");
    this.unsubscribe1 = null;
    this.unsubscribe2 = null;
    this.state = {
      users: [],
      manager: [],
    };
    this._isMounted = false;
  }

  onCollectionUpdate1 = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name, answer, correct, createdAt } = doc.data();
      users.push({
        id: doc.id,
        name,
        answer,
        correct,
        createdAt,
      });
    });
    if (this._isMounted) {
      this.setState({
        users,
      });
    }
  };

  onCollectionUpdate2 = (querySnapshot) => {
    const manager = [];
    querySnapshot.forEach((doc) => {
      const { isPause } = doc.data();
      manager.push({
        id: doc.id,
        isPause,
      });
    });
    if (this._isMounted) {
      this.setState({
        manager,
      });
    }
    this.restart();
  };

  componentDidMount() {
    this._isMounted = true;
    this.unsubscribe1 = this.ref1.onSnapshot(this.onCollectionUpdate1);
    this.unsubscribe2 = this.ref2.onSnapshot(this.onCollectionUpdate2);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // (newUser) is received from AddUser.js
  addUser = (newAnswer) => {
    this.ref1
      .add(newAnswer)
      .then((docRef) => {
        // this.setState({users: [...docRef]});
        console.log("Document successfully added!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  correct = (id, val) => {
    this.ref1
      .doc(id)
      .update({ correct: val })
      .then((docRef) => {
        // const users = this.state.users.filter((u, index) => {
        //   return u.id !== docRef.id;
        // });
        // this.setState({
        //   users: [...users, docRef]
        // })
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  deleteAll = () => {
    this.state.users.forEach((item) => {
      this.ref1
        .doc(item.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    });
    this.state.manager.forEach((item) => {
      this.ref2
        .doc(item.id)
        .delete()
        .then(() => {
          // this.restart();
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    });
  };
  restart = () => {
    const tmp = [
      ...document.querySelectorAll(`[name*="text-"]`),
      ...document.querySelectorAll(`[name*="btn-"]`),
    ];
    if (this.state.manager.length > 0) {
      tmp.forEach((i) => {
        //i.setAttribute("disabled", "disabled");
        i.disabled = true;
      });
    } else {
      tmp.forEach((i) => {
        //i.removeAttribute("disabled");
        i.disabled = false;
      });
    }
  };
  pause = () => {
    this.ref2
      .add({
        isPause: true,
      })
      .then((docRef) => {
        // this.setState({manager: [docRef]});
        console.log("Document successfully added!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  render() {
    return (
      <UserProvider>
        <Box component="div" m={1} boxShadow={3}>
          <AddUser addUser={this.addUser} />
          <Divider />
          <TableContainer component={Paper}>
            <Users allUsers={this.state.users} correct={this.correct} />
          </TableContainer>
          <Divider />
          <Manager pause={this.pause} deleteAll={this.deleteAll} />
        </Box>
      </UserProvider>
    );
  }
}

export default App;

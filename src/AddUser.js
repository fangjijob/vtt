import React, { Component, createContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {UserContext} from "./UserProvider";

class AddUser extends Component {
    static contextType = UserContext

    obj = {
        name: this.context.displayName,
        answer: null,
        correct: null,
        createdAt: null
    }

    //call addUser (App.js)
    handleSubmit = (e) => {
        e.preventDefault();
        const answer = e.target.elements[0].value;
        const no = e.target.elements[0].name.slice(-1);
        const reg = new RegExp("^[a-zA-Z]{" + no + "}$");
        if (reg.test(answer)) {
            this.obj.answer = answer;
            this.obj.createdAt = (new Date()).toISOString();
            this.props.addUser(this.obj);
            e.target.reset();
        } else {
            alert("Illigal Input! Please enter " + no + " Letters!");
            e.target.reset();
            return;
        }
    }


    render() {
        const idx = [3, 4, 5, 6, 7,];

        const answerBtn = idx.map(i => {
            let key1 = "text-" + i;
            let key2 = "btn-" + i;
            let label = i + " Letters";
            return (
                <form onSubmit={this.handleSubmit} key={i}>
                    <TextField name={key1} label={label} variant="outlined" color="secondary" size="small"/>
                    <Button name={key2} type="submit" variant="contained" color="secondary" >
                        {i} Letters
                </Button>
                </form>
            )
        });
        return (
            <Box align="left">
                    {answerBtn}
            </Box>
        );
    }
}
export default AddUser;
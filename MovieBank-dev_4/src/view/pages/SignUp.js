import axios from 'axios';
import React, { Component } from 'react';
import {
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import NavigationBar from '../component/NavigationBar';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.addNewUser = this.addNewUser.bind(this);
        this.state = { firstname: "", lastname:"", username:"", email:"", password: "", password_confirmation: "" };
    }



addNewUser() {
 //   console.log(this.state.email + this.state.lastname + this.state.firstname + this.state.username + this.state.password + this.state.password_confirmation)

    axios({
        method:'post',
        url: "http://localhost:3001/api/v1/users/",
        data: {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            email: this.state.email
        }
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => { console.log(error.response) })
  }
  /*axios.get("http://localhost:3001/api/v1/users/" )
    .then(response => {
      console.log(response)
    })
}*/

    render() {
        document.title = "Signup - MovieBank";
        return (
            <div>
                <NavigationBar />
                <div style={styles.bodyStyle}>
                    <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Username" onChange={ evt => this.setState({ username: evt.target.value})} />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Password" onChange={ evt => this.setState({ password: evt.target.value})} type="password" />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Confirm Password" onChange={ evt => this.setState({ password_confirmation: evt.target.value})} type="password" />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Name" onChange={ evt => this.setState({ firstname: evt.target.value})} />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Surname" onChange={ evt => this.setState({ lastname: evt.target.value})} />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Email" onChange={ evt => this.setState({ email: evt.target.value})} />
                    </InputGroup>
                    <Button size="sm" color="success" style={styles.style} onClick={this.addNewUser}>Sign Up</Button>
                </div>
            </div>
        );
    }
}

const styles = {
    style: {
        width: '100%',
        marginTop: 10,
    },
    bodyStyle: {
        margin: 'auto',
        width: '75%',
        borderRadius: 12,
        padding: '2%',
        marginTop: '10%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    }
}
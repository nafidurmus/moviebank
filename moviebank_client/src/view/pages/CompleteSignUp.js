import React, { Component } from 'react';
import {
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/Footer';
import { addNewUser, login } from '../../controller/utils/UserApi';


export default class CompleteSignup extends Component {

    constructor(props) {
        super(props);
        this.saveUser = this.saveUser.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            redirect: false,
            acceptChckBox: false,
            username: "", password: "", password_confirmation: ""
        };
    }

    handleChange = (e) => {
        e.persist();
       this.setState({ acceptChckBox : !this.state.acceptChckBox})
    }

    saveUser() {
        var loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        if ((this.state.username && this.state.password &&
            this.state.password_confirmation != (null || undefined || "")) && this.state.acceptChckBox) {

            if (loginData != (null || undefined || "")) {
                loginData.username = this.state.username
                loginData.password = this.state.password;
                loginData.password_confirmation = this.state.password_confirmation;

                addNewUser(loginData);

                login({ username: loginData.username, password: loginData.password }).then(function (data) {
                    if (data.status == 200) {
                        const logData = {
                            id: data.data.user.id,
                            firstname: data.data.user.firstname,
                            lastname: data.data.user.lastname,
                            username: data.data.user.username,
                            password: data.data.user.password_digest,
                            password_confirmation: data.data.user.password_digest,
                            email: data.data.user.email
                        }
                        //console.log(logData);
                        localStorage.clear();
                        localStorage.setItem("loginData", JSON.stringify(logData));
                    }

                    this.setState({ redirect: true });
                    //addNewUser(data);
                }.bind(this))
            }
        } else { alert("Please Fill All The Blanks")}
    }

    redirect() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/'
            }} />
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.saveUser();
        }
    }

    render() {
        document.title = "Complete Signup";
        return (
            <div>
                <NavigationBar />
                <div style={styles.bodyStyle}>
                    <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Username" onChange={evt => this.setState({ username: evt.target.value })} onKeyPress={this.handleKeyPress} />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Password" onChange={evt => this.setState({ password: evt.target.value })} type="password" onKeyPress={this.handleKeyPress} />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Confirm Password" onChange={evt => this.setState({ password_confirmation: evt.target.value })} onKeyPress={this.handleKeyPress} type="password" />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10, backgroundColor: '#eeeeee', height: 35, padding: 5 }}>
                        <input type="checkbox" onChange={this.handleChange} style={{marginTop: 7}} /> &nbsp;&nbsp;
                    <p>I read all <Link to={{ pathname: "/conditions" }}> Conditions of Use </Link></p> 
                    </InputGroup>
                    <Button size="sm" color="success" style={styles.style} onClick={this.saveUser}>Complete</Button>
                    {this.state.redirect ? this.redirect() : ""}
                </div>
                <Footer />
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
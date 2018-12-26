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
import {addNewUser} from '../../controller/utils/UserApi';


export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.saveUser = this.saveUser.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { 
            redirect : false,
            acceptChckBox: false,
            firstname: "", lastname:"", username:"", email:"", password: "", password_confirmation: "" };
    }

async saveUser() {
        var data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            email: this.state.email
        }
        if(data.username && data.firstname && data.lastname && data.password && data.password_confirmation && data.email && this.state.acceptChckBox){
            var statusCode = await addNewUser(data);
            if(statusCode.status == 200 || statusCode.status == 201 || statusCode.status == 500) { this.setState({ redirect: true }) }
            else { alert("Birşeyler ters gitti :( \n" + statusCode.status) }
        }
  }

  redirect(){
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

handleChange = (e) => {
    e.persist();
   this.setState({ acceptChckBox : !this.state.acceptChckBox})
}

    render() {
        document.title = "Signup - MovieBank";
        return (
            <div>
                <NavigationBar />
                <div style={styles.bodyStyle}>
                    <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Username" onChange={ evt => this.setState({ username: evt.target.value})} onKeyPress={this.handleKeyPress}/>
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Password" onChange={ evt => this.setState({ password: evt.target.value})} type="password" onKeyPress={this.handleKeyPress}/>
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Confirm Password" onChange={ evt => this.setState({ password_confirmation: evt.target.value})} onKeyPress={this.handleKeyPress} type="password" />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Name" onChange={ evt => this.setState({ firstname: evt.target.value})} onKeyPress={this.handleKeyPress}/>
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Surname" onChange={ evt => this.setState({ lastname: evt.target.value})} onKeyPress={this.handleKeyPress}/>
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Email" onChange={ evt => this.setState({ email: evt.target.value})} onKeyPress={this.handleKeyPress} />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10, backgroundColor: '#eeeeee', height: 35, padding: 5 }}>
                        <input type="checkbox" onChange={this.handleChange} style={{marginTop: 7}} /> &nbsp;&nbsp;
                    <p>I read all <Link to={{ pathname: "/conditions" }}> Conditions of Use </Link></p> 
                    </InputGroup>
                    
                    <Button size="sm" color="success" style={styles.style} onClick={this.saveUser}>Sign Up</Button>
                    {this.state.redirect ? this.redirect() : ""}
                </div>
                <Footer/>
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
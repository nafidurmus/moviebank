import React, { Component } from 'react';
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Input,
    Button,
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';
import { login } from '../../controller/utils/UserApi';

export default class LoginDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = { dropdownOpen: false, username: null, password:null, login:false };
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.setState({ login: true })
        }
    }

    loginUser() {
        if(this.state.username && this.state.password && this.state.login) {
            var user = {
                username: this.state.username,
                password: this.state.password
            }
            this.setState({login: false})

            const redirect = login(user).then(function(data){
                 
                
                if (data.status == 200) {
                    const logData = {
                        id: data.data.user.id,
                        name: data.data.user.firstname,
                        surname: data.data.user.lastname,
                        username: data.data.user.username,
                        password: data.data.user.password_digest,
                        password_confirm: data.data.user.password_digest,
                        email: data.data.user.email
                    }
                    //console.log(logData);
        
                    localStorage.setItem("loginData", JSON.stringify(logData));
    
                    return window.location.reload(false);
              }
            }.bind(this));
            //   if(redirect){
            //       return <Redirect to={{
            //         pathname: '/'
            //     }} />
            //   }
            
        }

}

    render() {

        return (
            <UncontrolledDropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle color="link" size="sm" style={styles.navbarTextStyle}>
                    Sign Up / Login
                </DropdownToggle>
                <DropdownMenu style={styles.dropdownStyle} right>
                    {/* <DropdownItem header>Login</DropdownItem>
                                                <DropdownItem divider /> */}
                    {/* <DropdownItem disabled></DropdownItem> */}
                    <Input size="sm" placeholder="Username" onChange={ evt => this.setState({ username: evt.target.value})} onKeyPress={this.handleKeyPress}/>
                    <Input size="sm" placeholder="Password" style={{ marginTop: 5 }} type="password" onKeyPress={this.handleKeyPress} onChange={ evt => this.setState({ password: evt.target.value})} />
                    <Button size="sm" color="success" style={styles.style} onClick={() => this.setState({ login: true })}>Login</Button>
                    {this.loginUser()}
                    <Link to={{
                        pathname: "/forgot-password",
                    }}>
                        <Button size="sm" color="secondary" style={styles.style}>I forgot my password</Button>
                    </Link>

                    <DropdownItem divider />

                    <FacebookButton />
                    <div style={styles.style} />
                    <GoogleButton />

                    <DropdownItem divider />
                    <Link to={{
                        pathname: "/signup",
                    }}>
                        <Button size="sm" color="info" style={{ width: '100%', }}>Sign Up</Button>
                    </Link>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}

const styles = {
    style: {
        width: '100%',
        marginTop: 7,
    },
    dropdownStyle: {
        padding: 20,
        minWidth: 260,
        backgroundColor: '#f7f7f7',
    },
    navbarTextStyle: {
        fontSize: 13,
        border: 0,
        margin: 5,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: 20,
        marginTop: -4,
        color: '#ffffff',
    },
}
import React, { Component } from 'react';
import {
    Input, Button, InputGroup, InputGroupAddon, Row, Col, Container, Label, InputGroupText
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/Footer';
import GoogleButton from '../component/GoogleButton';
import FacebookButton from '../component/FacebookButton';
import { getUsers } from '../../controller/utils/UserApi';

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.changePassword = this.changePassword.bind(this);
        this.state = { email: null, username: null, redirect: false, userExist:null };
    }

    changePassword() {
        this.setState({ redirect: true });
        if (this.state.email && this.state.username) {
            let userExist = false;
            var returnBool = getUsers().then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if ((response.data[i].username == this.state.username) && (response.data[i].email == this.state.email)) {
                        userExist = true;
                        break;
                    } else {
                        userExist = false
                    }
                }
                this.setState({ userExist });
            })
        } else {
            alert("Please fill email and username blanks!");
        }
    }

    redirectPage(){
        this.setState({ redirect: false });
        if (this.state.userExist) {
           
            return <Redirect to={{
                pathname: '/change-password',
                search: "?username=" + this.state.username + "&email=" + this.state.email,
            }} />;
            
            } else {
                return alert("User can not found in this username or password");
                
            }
            //console.log(userExist)
    }

    render() {
        document.title = "Change My Password :(";
        return (
            <div>
                <NavigationBar />
                <Container fluid style={{ margin: '5%', width: '90%' }}>
                    <Row>
                        <Col sm={12} lg={6} style={styles.bodyStyle}>
                            <Label>I forgot my password</Label>
                            <InputGroup size="sm" style={{ marginTop: 10 }}>
                                <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 90 }}>Email: </InputGroupText></InputGroupAddon>
                                <Input placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                            </InputGroup>
                            <InputGroup size="sm" style={{ marginTop: 10 }}>
                                <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 90 }}>Username: </InputGroupText></InputGroupAddon>
                                <Input placeholder="Username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                            </InputGroup>
                            
                            <Button size="md" color="success" style={styles.style} onClick={this.changePassword}>Send</Button>
                            {(this.state.userExist != null && this.state.redirect == true) ? this.redirectPage() : ""}
                        </Col>
                        <Col sm={12} lg={5} style={styles.bodyStyle}>
                            <Label>Sign Up with Social Network</Label>
                            <GoogleButton />
                            <FacebookButton />
                        </Col>
                    </Row>
                </Container>
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
        margin: 10,
        width: '100%',
        borderRadius: 5,
        padding: '2%',
        backgroundColor: '#eeeeee'
    }
}
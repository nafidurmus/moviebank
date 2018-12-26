import React, { Component } from 'react';
import {
    Input, Button, InputGroup, InputGroupAddon, Row, Col, Container, Label, InputGroupText
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/Footer';
import GoogleButton from '../component/GoogleButton';
import FacebookButton from '../component/FacebookButton';
import { getUsers, updateUser } from '../../controller/utils/UserApi';

export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.changePassword = this.changePassword.bind(this);
        this.state = { password: null, password_confirm: null, clicked: false };
    }

    changePassword() {
        const urlParams = new URLSearchParams(window.location.search);
                const username = urlParams.get('username');
                const email = urlParams.get('email');
        this.setState({ clicked: false })    
        if (this.state.password && this.state.password_confirm) {
            const newLoginData = {
                password: this.state.password,
                password_confirmation: this.state.password_confirm,
            }
            updateUser(username, newLoginData);

            return <Redirect to={{
            pathname: '/'
        }} />
        } else {
            alert("Please fill password and password_confirm blanks!")
        }
    }
    render() {
        document.title = "New Password";
        return (
            <div>
                <NavigationBar />
{this.state.clicked ? this.changePassword() : ""}
                <Container fluid style={{ margin: '5%', width: '90%' }}>
                    <Row>
                        <Col sm={12} lg={12} style={styles.bodyStyle}>
                            <Label>New Password</Label>
                            <InputGroup size="sm" style={{ marginTop: 10 }}>
                                <InputGroupAddon addonType="prepend" ><InputGroupText style={{ width: 140 }}>Password: </InputGroupText></InputGroupAddon>
                                <Input placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                            </InputGroup>
                            <InputGroup size="sm" style={{ marginTop: 10 }}>
                                <InputGroupAddon addonType="prepend" ><InputGroupText style={{ width: 140 }}>Password Confirm: </InputGroupText></InputGroupAddon>
                                <Input placeholder="Password Confirm" value={this.state.password_confirm} onChange={(e) => this.setState({ password_confirm: e.target.value })} />
                            </InputGroup>
                            <Button size="md" color="success" style={styles.style} onClick={() => this.setState({ clicked: true })}>Change</Button>
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
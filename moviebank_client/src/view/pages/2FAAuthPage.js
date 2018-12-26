import React, { Component } from 'react';
import {
    Input, Button, InputGroup, InputGroupAddon, Row, Col, Container, CardImg, Label
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
//import speakeasy from 'speakeasy';
import otplib from 'otplib';
//import { authenticator } from 'otplib/otplib-browser';
import authenticator from 'otplib/authenticator';

import QRCode from 'qrcode';
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/Footer';

export default class TwoFAAuthPage extends Component {

    constructor(props) {
        super(props);
        this.state = { code: null, qrCodeImg: null, verified: null };
        this.twoFactor = this.twoFactor.bind(this);
        this.verify = this.verify.bind(this); 
        this.handleKeyPress = this.handleKeyPress.bind(this);
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');
        this.twoFactor(userId);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.verify();
        }
    }

    twoFactor(id) {
        if (id) {
            const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
            this.secret = loginData.twofa; //global değişken
            console.log(this.secret)
            const otpauth = authenticator.keyuri('user', 'service', this.secret);
            QRCode.toDataURL(otpauth)
            .then(image_data => {
                this.setState({ qrCodeImg: image_data })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }


    verify(){
        // This is provided the by the user via form POST
        const userToken = this.state.code//params.get('token');
        var secret = this.secret;
        console.log(secret)
        //const token = authenticator.generate(secret);
        // Verify that the user token matches what it should at this moment
        var verified = authenticator.check(userToken, secret)
        this.setState({ verified })
    }

    render() {
        document.title = "Verify Your Account - MovieBank";
        return (
            <div>
                <NavigationBar />
                {(this.state.verified==true) ? <Redirect to={{ pathname: '/' }} /> : "" }
                {(this.state.verified==false) ? alert("Please check again your verification code.") + this.setState({verified: null}): "" }
                <Container fluid style={{ margin: '5%', width: '90%' }}>
                    <Row>
                        <Col sm={12} lg={6} style={styles.bodyStyle}>
                            <div style={styles.qrStyle}><Label>2 Factor Authentication</Label><br />
                            {this.state.qrCodeImg ? <CardImg top width="100%" style={{ height: 250, width: 250, margin:'auto' }} src={this.state.qrCodeImg} alt="Photo" /> : ""}
                            </div>
                            <InputGroup size="sm" style={{ marginTop: 10 }}>
                                <InputGroupAddon addonType="prepend" >Enter verification code here: </InputGroupAddon>
                                <Input placeholder="code" value={this.state.code} onKeyPress={this.handleKeyPress} onChange={(e) => this.setState({ code: e.target.value })} />
                            </InputGroup>
                            <Button size="md" color="success" style={styles.style} onClick={this.verify}>Send</Button>
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
        margin: 'auto',
        width: '100%',
        borderRadius: 5,
        padding: '2%',
        backgroundColor: '#eeeeee'
    },
    qrStyle: { 
        width: '100%', 
        margin: 'auto', 
        paddingBottom: 10, 
        textAlign: 'center', 
        display: 'inline - block' 
    }
}
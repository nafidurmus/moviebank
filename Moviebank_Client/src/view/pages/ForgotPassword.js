import React, { Component } from 'react';
import {
    Input, Button, InputGroup, InputGroupAddon, Row, Col, Container
} from 'reactstrap';
import NavigationBar from '../component/NavigationBar';
import { Label } from 'reactstrap';
import Footer from '../component/Footer';
import GoogleButton from '../component/GoogleButton';
import FacebookButton from '../component/FacebookButton';

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = { email: null };
    }

    render() {
        document.title = "Send Me Password :(";
        return (
            <div>
                <NavigationBar />

                <Container fluid style={{ margin: '5%', width: '90%' }}>
                    <Row>
                        <Col sm={12} lg={6} style={styles.bodyStyle}>
                            <Label>I forgot my password</Label>
                            <InputGroup size="sm" style={{ marginTop: 10 }}>
                                <InputGroupAddon addonType="prepend" >Email: </InputGroupAddon>
                                <Input placeholder="Email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                            </InputGroup>
                            <Button size="md" color="success" style={styles.style}>Send</Button>
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
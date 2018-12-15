import React, { Component } from 'react';
import {
    Input, Button, InputGroup, InputGroupAddon, Row, Col, Container, CardImg, Label
} from 'reactstrap';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/Footer';

export default class TwoFAAuthPage extends Component {

    constructor(props) {
        super(props);
        this.state = { code: null, qrCodeImg: null };
        this.twoFactor = this.twoFactor.bind(this);

        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');
        this.twoFactor(userId);
    }

    twoFactor(id) {
        if (id) {
            var secret = speakeasy.generateSecret({ length: 20 });
            console.log(secret.base32); // Save this value to your DB for the user

            // Example:  JFBVG4R7ORKHEZCFHZFW26L5F55SSP2Y


            QRCode.toDataURL(secret.otpauth_url)
            .then(image_data => {
                this.setState({ qrCodeImg: image_data })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        document.title = "Verify Your Account - MovieBank";
        return (
            <div>
                <NavigationBar />

                <Container fluid style={{ margin: '5%', width: '90%' }}>
                    <Row>
                        <Col sm={12} lg={6} style={styles.bodyStyle}>
                            <div style={{  width: '100%', margin: 'auto',}}><Label>2 Factor Authentication</Label><br />
                            {this.state.qrCodeImg ? <CardImg top width="100%" style={{ height: 250, width: 250 }} src={this.state.qrCodeImg} alt="Photo" /> : ""}
                            </div>
                            <InputGroup size="sm" style={{ marginTop: 10 }}>
                                <InputGroupAddon addonType="prepend" >Enter verification code here: </InputGroupAddon>
                                <Input placeholder="code" value={this.state.code} onChange={(e) => this.setState({ code: e.target.value })} />
                            </InputGroup>
                            <Button size="md" color="success" style={styles.style}>Send</Button>
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
    }
}
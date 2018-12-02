import React, { Component } from 'react';
import { Button } from 'reactstrap';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export default class FacebookButton extends Component {

    constructor(props) {
        super(props);
        this.loginFacebook = this.loginFacebook.bind(this);
        this.logoutFacebook = this.logoutFacebook.bind(this);
    }

    static FB = window.FB;

    loginFacebook(response) {
        //console.log(response);
        if (response.status != "unknown") {
            localStorage.setItem("loginData", JSON.stringify(response));
            FacebookButton.FB = window.FB;
        }
    }
    logoutFacebook() {
        localStorage.clear();
        //window.FB.logout();
        FacebookButton.FB.logout();
        //localStorage.removeItem("loginData")
    }

    render() {
        return (
            <div>
                {this.props.logSelect ? 
                <FacebookLogin
                    appId="872171269654927" //APP ID NOT CREATED YET
                    fields="name,email,picture"
                    callback={this.loginFacebook}
                    autoLoad={true}
                    version="3.1"
                    render={renderProps => (
                        <Button size="sm" onClick={renderProps.onClick} style={{ ...styles.style, ...styles.FbButtonStyle }}>Continue With Facebook</Button>
                    )}
                    /> : <Button color="link" size="sm" onClick={this.logoutFacebook}>Logout</Button>}
            </div>
        );
    }
}

const styles = {
    style: {
        width: '100%',
        marginTop: 5,
    },
    FbButtonStyle: {
        backgroundColor: '#4267b2'
    },
}
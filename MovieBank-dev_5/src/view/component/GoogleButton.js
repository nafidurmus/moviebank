import React, { Component } from 'react';
import { Button } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

export default class GoogleButton extends Component {

    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    responseGoogle(response) {
        // console.log(response);
        if (response.profileObj != (null || "" || undefined)) {

            const logData = {
                name: response.profileObj.givenName,
                surname: response.profileObj.familyName,
                username: response.profileObj.name,
                password: /*'Google' + */response.profileObj.googleId,
                password_confirm: /*'Google' + */response.profileObj.googleId,
                email: response.profileObj.email
            };
            this.signOut();
            localStorage.setItem("loginData", JSON.stringify(logData));
            window.location.reload(false); //Sayfayı yenilettiriyoruz.
        }
    }

    signOut() {
        const auth2 = window.gapi.auth2.getAuthInstance()
        if (auth2 != null) {
            auth2.signOut().then(
                auth2.disconnect().then(this.props.onLogoutSuccess)
            )
        }
    }

    render() {
        return (
            <div>
                <GoogleLogin
                    clientId='302924880838-rtf0gkk0rum1q8vrbmh8gg3oi40dkbtb.apps.googleusercontent.com'
                    buttonText="Continue With Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    render={renderProps => (
                        <Button size="sm" onClick={renderProps.onClick} style={styles.style}>Continue With Google</Button>
                    )}
                />
            </div>
        );
    }
}


const styles = {
    style: {
        width: '100%',
        backgroundColor: '#d34836'
    },
}
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { getUsers } from '../../controller/utils/UserApi';

export default class GoogleButton extends Component {

    constructor(props) {
        super(props);
        this.state = {redirect: false};
        this.responseGoogle = this.responseGoogle.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    async responseGoogle(response) {
        //console.log(response);
        if (response.profileObj != (null || "" || undefined)) {

            let userSignedUp = await getUsers().then(results => {
                for(let i = 0 ; i < results.data.length ; i ++) {
                    if(results.data[i].email == response.profileObj.email){
                        return results.data[i];
                    }
                }
                return null
            })
            .catch(error => {
                return error.response
            });

            const logData = {
                id: response.profileObj.id,
                firstname: response.profileObj.givenName,
                lastname: response.profileObj.familyName,
                username: response.profileObj.name,
                password: /*'Google' + */response.profileObj.googleId,
                password_confirmation: /*'Google' + */response.profileObj.googleId,
                email: response.profileObj.email
            };
            //console.log(userSignedUp)
            this.signOut();
            
            if(userSignedUp != null) { 
                logData.id = userSignedUp.id;
                logData.username = userSignedUp.username;
                logData.password = userSignedUp.password_digest;
                logData.password_confirmation = userSignedUp.password_digest;
                logData.firstname = userSignedUp.firstname;
                logData.lastname = userSignedUp.lastname;

                localStorage.setItem("loginData", JSON.stringify(logData));
                window.location.reload(false); //Sayfayı yenilettiriyoruz.
            } 
            else {
                this.setState({ redirect: true });
                localStorage.setItem("loginData", JSON.stringify(logData));
                
            }


            // localStorage.setItem("loginData", JSON.stringify(logData));
            // window.location.reload(false); //Sayfayı yenilettiriyoruz.
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
                 {this.state.redirect ? <Redirect to={{ pathname: '/complete-signup' }} /> : ""}
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
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { getUsers } from '../../controller/utils/UserApi';

export default class FacebookButton extends Component {

    constructor(props) {
        super(props);
        this.state = {redirect: false};
        this.loginFacebook = this.loginFacebook.bind(this);
        this.logoutFacebook = this.logoutFacebook.bind(this);
    }

    async loginFacebook(response) {
        // console.log(response);
        if (response.id != (null || "" || undefined)) {

            let userSignedUp = await getUsers().then(results => {
                for(let i = 0 ; i < results.data.length ; i ++) {
                    if(results.data[i].email == response.email){
                        return results.data[i];
                    }
                }
                return null
            })
            .catch(error => {
                return error.response
            });
            //console.log(userSignedUp)
            let logData = {
                id: response.id,
                firstname: response.name.substring(0, response.name.lastIndexOf(" ")),
                lastname: response.name.substring(response.name.lastIndexOf(" ") + 1),
                username: response.name,
                password: /*'Facebook' + */response.id,
                password_confirmation: /*'Facebook' + */response.id,
                email: response.email
            };

            //Daha sonradan logout olunamadığı için facebook bilgilerini bir üst satırda localstorage ile kaydedip,
            //burada facebooktan çıkış yapılıyor. (logout olmak için FacebookButtondan bir tane üretilmeli yada aynı
            //sayfa içinde login logout olmalı)
            
            //this.logoutFacebook();
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

             //console.log(logData);
        }
    }

    logoutFacebook() {
        window.FB.logout();
    }

    render() {
        return (
            <div>
                {this.state.redirect ? <Redirect to={{ pathname: '/complete-signup' }} /> : ""}
                <FacebookLogin
                    appId="872171269654927" //APP ID NOT CREATED YET
                    fields="name,email,picture"
                    callback={this.loginFacebook}
                    autoLoad={false}
                    version="3.1"
                    render={renderProps => (
                        <Button size="sm" onClick={renderProps.onClick} style={{ ...styles.style, ...styles.FbButtonStyle }}>Continue With Facebook</Button>
                    )} />
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
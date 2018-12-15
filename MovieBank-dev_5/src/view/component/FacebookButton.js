import React, { Component } from 'react';
import { Button } from 'reactstrap';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export default class FacebookButton extends Component {

    constructor(props) {
        super(props);
        this.loginFacebook = this.loginFacebook.bind(this);
        this.logoutFacebook = this.logoutFacebook.bind(this);
    }

    loginFacebook(response) {
        // console.log(response);
        if (response.id != (null || "" || undefined)) {

            const logData = {
                /*Sadece şimdilik bunu kullanıyorum.Bağlarken silicez*/ id: response.id,
                name: response.name.substring(0, response.name.lastIndexOf(" ")),
                surname: response.name.substring(response.name.lastIndexOf(" ")+1),
                username: response.name,
                password: /*'Facebook' + */response.id,
                password_confirm: /*'Facebook' + */response.id,
                email: response.email
            }
            // console.log(logData);

            localStorage.setItem("loginData", JSON.stringify(logData));
            this.logoutFacebook(); 
            //Daha sonradan logout olunamadığı için facebook bilgilerini bir üst satırda localstorage ile kaydedip,
            //burada facebooktan çıkış yapılıyor. (logout olmak için FacebookButtondan bir tane üretilmeli yada aynı
            //sayfa içinde login logout olmalı)
            window.location.reload(false); //Sayfayı yenilettiriyoruz.
        }
    }
    logoutFacebook() {
        window.FB.logout();
    }

    render() {
        return (
            <div> 
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
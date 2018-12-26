import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import NavbarArama from './NavbarSearch';
import logo from '../image/logo.png';
import LoginDropdown from './LoginDropdown';
import logout from '../image/logout.png';

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.collapseToggleNavbar = this.collapseToggleNavbar.bind(this);
        this.loginRender = this.loginRender.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.state = { collapseNavbar: false, logout: false, };
    }

    collapseToggleNavbar() {
        this.setState({
            collapseNavbar: !this.state.collapseNavbar
        });
    }

    onLogout() {
        if (this.state.logout == true) {
            localStorage.clear();
            return <Redirect to={{
                pathname: '/',
            }} />
            //window.location.reload(false);
        }
    }

    loginRender(loginData) {
        return (
            <Nav className="ml-auto">
                <NavItem style={styles.navbarTextStyle}>
                    <Link to={{ pathname: "/watched-list", search: ("?id:" + loginData.id) }} style={styles.linkStyle}>
                        Watchlist
                    </Link>
                </NavItem>
                <NavItem style={styles.navbarTextStyle}>
                    <Link to={{ pathname: "/watch-later", search: ("?id:" + loginData.id) }} style={styles.linkStyle}>
                        Watch Later
                    </Link>
                </NavItem>
                <NavItem style={styles.navbarTextStyle}>
                    <Link to={{ pathname: "/profile-details", search: ("?id:" + loginData.id) }} style={styles.linkStyle}>
                        Welcome  {loginData.username}
                    </Link>{/*&emsp*/}
                </NavItem>
                <NavItem style={styles.navbarTextStyle}>
                    <Button color="link" style={styles.logoutButtonStyle} size="sm" onClick={() => this.setState({ logout: true })} />
                    {this.onLogout()}{/*Butona basınca doğrudan fonksiyona göndererek çalışmadığı için state 
                belirledim(Butona basınca true oluyor) ve burada sürekli fonksiyona göndererek kontrol etmesini sağladım*/}
                </NavItem>

            </Nav>

        )
    }

    render() {
        //localStorage.clear();
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        //console.log(loginData)

        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/" style={{ marginRight: 10, marginLeft: '3%', width: '10%' }}>
                        <img src={logo} height="70" width="70"></img>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.collapseToggleNavbar} style={{ width: '20%' }} />
                    <Collapse isOpen={this.state.collapseNavbar} navbar left style={{ width: '60%', marginTop: 5 }}>
                        <div style={{ width: '95%' }}>
                            <NavbarArama />
                            <Nav className="mr-auto" style={{ height: '50%', width: '100%', marginTop: 5 }} navbar>  {/*sağa almak için ml-auto*/}
                                <NavItem style={styles.navbarTextStyle}>
                                    <Link to={{ pathname: "/top100", }} style={styles.linkStyle}>
                                        Top 100
	                                </Link>
                                </NavItem>
                                <NavItem style={styles.navbarTextStyle}>
                                    <Link to={{ pathname: "/trends", }} style={styles.linkStyle}>
                                        Weekly Trends
                                    </Link>
                                </NavItem>
                                <NavItem style={styles.navbarTextStyle}>
                                    <Link to={{ pathname: "/upcoming", }} style={styles.linkStyle}>
                                        Upcoming
                                    </Link>
                                </NavItem>
                                <NavItem style={styles.navbarTextStyle}>
                                    <Link to={{ pathname: "/popular-celebs", }} style={styles.linkStyle}>
                                        Popular Celebs
                                    </Link>
                                </NavItem>
                                {loginData ?
                                    this.loginRender(loginData) :
                                    <Nav className="ml-auto">
                                        <NavItem style={styles.navbarTextStyle}>
                                            <LoginDropdown />
                                        </NavItem>
                                    </Nav>}
                            </Nav>
                        </div>
                    </Collapse>
                </Navbar>
            </div>

        );
    }
}

const styles = {
    logoutButtonStyle: {
        backgroundImage: "url(" + logout + ")",
        backgroundSize: 20,
        height: 25,
        width: 25,
        backgroundRepeat: 'no-repeat'
    },
    navbarTextStyle: {
        fontSize: 13,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 0,
        margin: 5,
    },
    linkStyle: {
        color: '#ffffff',
    },

}
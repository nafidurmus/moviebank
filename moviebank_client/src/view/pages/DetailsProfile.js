import React, { Component } from 'react';
import {
    Container, Col, Row, Input, Button, InputGroup, InputGroupAddon, InputGroupText,
    TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import authenticator from 'otplib/authenticator';
import Reflux from 'reflux';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import classnames from 'classnames';
import NavigationBar from '../component/NavigationBar';
import CardListMovie from '../component/CardListMovie';
import Footer from '../component/Footer';
import NowPlaying from '../component/NowPlaying';
import ContentContainer from '../component/ContentContainer';
import { actions } from '../../actions';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { FilmDetailsStore } from '../../controller/stores/FilmDetailsStore';
import { getWatchLaterList, getWatchedList, updateUser } from '../../controller/utils/UserApi';


export default class DetailsProfile extends Reflux.Component {
    constructor(props) {
        super(props);
        const loginInfo = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        this.state = {
            profileId: this.props.location.search.split(":")[1],
            activeTab: '1',
            unlockPrflInfo: false,
            twoFA_on_off: loginInfo.twofa_on_off,
            twofakey: null,
            /*watchedList: null,
            watchLaterList: null,*/

            id: loginInfo ? loginInfo.id : "",
            username: loginInfo ? loginInfo.username : "",
            name: loginInfo ? loginInfo.firstname : "",
            surname: loginInfo ? loginInfo.lastname : "",
            password: loginInfo ? loginInfo.password : "",
            password_confirm: loginInfo ? loginInfo.password_confirmation : "",
            email: loginInfo ? loginInfo.email : "",
        }
        this.stores = [BoxOfficeStore, FilmDetailsStore];

        this.toggleTab = this.toggleTab.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
        this.saveData = this.saveData.bind(this);
        this.handle2FAChange = this.handle2FAChange.bind(this);
        //this.divideFilms = this.divideFilms.bind(this);
        this.getLists = this.getLists.bind(this);
        this.redirect = this.redirect.bind(this);
        this.getLists();
    }

    redirect() {
        alert("Please Login or Signup Firstly!")
        return <Redirect to={{
            pathname: '/'
        }} />
    }

    handle2FAChange(){
        var twofa = !this.state.twoFA_on_off;
        if(this.state.unlockPrflInfo) {
            this.setState({ twoFA_on_off: twofa})
            if(twofa) {
                const secret = authenticator.generateSecret(); // Save this value to your DB for the user
                this.setState({ twofakey: secret})
                // console.log(secret);
            } else {
                this.setState({ twofakey: null});
            }
        } else {

        }
        
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    /*divideFilms(){
        if(this.state.listLengths && ((this.state.watchedList && this.state.watchLaterList) == null)){
            var watchedListLength = this.state.listLengths[0];
            //var watchLaterListLength = this.state.listLengths[1];
            //console.log(this.state.filmDetailsForLists.slice(0,watchedListLength))
            this.setState({ 
                watchedList: this.state.filmDetailsForLists.slice(0,watchedListLength),
                watchLaterList: this.state.filmDetailsForLists.slice(watchedListLength)
            })
        }
    }*/

    async getLists() {
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        if(loginData != null){
            let movieIds = [];
        let watchedListLength = await getWatchedList(loginData.username).then(response => {
            for (let i = 0; i < response.data.watchlist.length; i++) {
                movieIds.push(response.data.watchlist[i].watchlist_movie_id);
            }
            return response.data.watchlist.length;
        })
        //console.log("watclist Length: " + watchedListLength)

        let watchLaterLength = await getWatchLaterList(loginData.username).then(response => {
            for (let i = 0; i < response.data.watchlater.length; i++) {
                movieIds.push(response.data.watchlater[i].watchlater_movie_id);
            }
            return response.data.watchlater.length;
        })
        //console.log("watch later length: " + watchLaterLength)


        actions.getFilmDetailsForLists(movieIds);
        await this.setState({ listLengths: [watchedListLength, watchLaterLength] })
    }
    }

    saveData() {
        this.setState({ unlockPrflInfo: false });
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        const newLoginData = {
            /*Burası Silinecek*/id: this.state.id,
            firstname: this.state.name,
            lastname: this.state.surname,
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirm,
            email: this.state.email,
            twofa_on_off: this.state.twoFA_on_off,
            twofa: this.state.twofakey
        }
        updateUser(loginData.username, newLoginData);
        localStorage.clear();
        localStorage.setItem("loginData", JSON.stringify(newLoginData));
        //Apiye loginDatayı göndereceğiz burada.

        window.location.reload(false);
    }

    renderProfileInfo() {
        const lockOrUnlock = this.state.unlockPrflInfo;
        const form = (
            <div>
                {/* <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 90 }}>
                        Username: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Username"
                        value={this.state.username}
                        onChange={(val) => this.setState({ username: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup> */}
                <InputGroup size="sm" style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 145 }}>
                        Password: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={(val) => this.setState({ password: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup>
                <InputGroup size="sm" style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 145 }}>
                        Password Confirm: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Confirm Password"
                        type="password"
                        value={this.state.password_confirm}
                        onChange={(val) => this.setState({ password_confirm: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup>
                <InputGroup size="sm" style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 145 }}>
                        Name: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Name"
                        value={this.state.name}
                        onChange={(val) => this.setState({ name: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup>
                <InputGroup size="sm" style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 145 }}>
                        Surname: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Surname"
                        value={this.state.surname}
                        onChange={(val) => this.setState({ surname: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup>
                <InputGroup size="sm" onClick={this.handle2FAChange} style={{ marginTop: 10, backgroundColor: '#eeeeee', height: 35, padding: 5, borderRadius: 5 }}>
                        <input type="checkbox" checked={this.state.twoFA_on_off} style={{marginTop: 7}} /> &nbsp;&nbsp;
                    <p>2 Factor Authentication</p> 
                </InputGroup>
                {/* <InputGroup size="sm" style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 90 }}>
                        Email: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Email"
                        value={this.state.email}
                        onChange={(val) => this.setState({ email: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup> */}
                {this.state.unlockPrflInfo ?
                    <Button size="sm" color="success" style={{ marginTop: 10 }} onClick={this.saveData}>Save</Button>
                    :
                    <Button size="sm" color="primary" style={{ marginTop: 10 }} onClick={() => this.setState({ unlockPrflInfo: true })}>Update my info</Button>}
            </div>)
        return form;
    }

    renderTabs() {
        const tabs = (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggleTab('1'); }}
                        >
                            Profile Information
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggleTab('2'); }}
                        >
                            Movie Lists
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row style={{ marginTop: 20 }}>
                            <Col sm="12">
                                {this.renderProfileInfo()}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row style={{ marginTop: 20 }}>
                            <Col sm="12">
                                <ContentContainer title="Watchlist">
                                    {(this.state.filmDetailsForLists && this.state.listLengths) ?
                                        <CardListMovie items="4" list={this.state.filmDetailsForLists.slice(0, this.state.listLengths[0])} />
                                        : "Loading..."}
                                </ContentContainer>
                                <Link to={{ pathname: "/watched-list", search: ("?id:" + this.state.id) }}>
                                    <Button
                                        size="lg"
                                        color="success"
                                        style={{ marginTop: -20, marginBottom: 10, width: '100%' }}
                                    >Show All Watchlist</Button></Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <ContentContainer title="Watch Later">
                                    {((this.state.filmDetailsForLists && this.state.listLengths) != (null || undefined)) ?
                                        <CardListMovie items="4" list={this.state.filmDetailsForLists.slice(this.state.listLengths[0])} /> : "Loading..."}
                                </ContentContainer>
                                <Link to={{ pathname: "/watch-later", search: ("?id:" + this.state.id) }}>
                                    <Button
                                        size="lg"
                                        color="primary"
                                        style={{ marginTop: -20, marginBottom: 10, width: '100%' }}
                                    >Show All Watch Later List</Button></Link>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        )
        return tabs;
    }

    render() {
        document.title = "Profile Details";
        const loginInfo = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : "";
        return (
            <div>
                {/*this.state.filmDetailsForLists ? this.divideFilms() : ""*/}
                <NavigationBar />
                {loginInfo ?
                    <div style={{ margin: '3%' }} className="w-screen">
                        <Container fluid>
                            <Row>
                                <Col sm={12} md={8} lg={9} style={{ marginBottom: '2%' }}>
                                    {this.renderTabs()}

                                </Col>
                                <Col>
                                    {this.state.boxOffice ? <NowPlaying boxOfficeData={this.state.boxOffice} /> : <div></div>}
                                </Col>
                            </Row>
                        </Container>
                        <Footer />
                    </div> 
                    : this.redirect()}
            </div>
        );
    }
}
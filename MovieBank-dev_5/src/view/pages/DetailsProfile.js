import React, { Component } from 'react';
import {
    Container, Col, Row, Input, Button, InputGroup, InputGroupAddon, InputGroupText,
    TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

import Reflux from 'reflux';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import classnames from 'classnames';
import NavigationBar from '../component/NavigationBar';
import CardListMovie from '../component/CardListMovie';
import Footer from '../component/Footer';
import NowPlaying from '../component/NowPlaying';
import ContentContainer from '../component/ContentContainer';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { PlayingStore } from '../../controller/stores/PlayingStore';


export default class DetailsProfile extends Reflux.Component {
    constructor(props) {
        super(props);
        const loginInfo = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : "";
        this.state = {
            profileId: this.props.location.search.split(":")[1],
            activeTab: '1',
            unlockPrflInfo: false,

            id: loginInfo.id ? loginInfo.id : "",
            username: loginInfo.username ? loginInfo.username : "",
            name: loginInfo.name ? loginInfo.name : "",
            surname: loginInfo.surname ? loginInfo.surname : "",
            password: loginInfo.password ? loginInfo.password : "",
            password_confirm: loginInfo.password_confirm ? loginInfo.password_confirm : "",
            email: loginInfo.email ? loginInfo.email : "",
        }
        this.stores = [BoxOfficeStore, PlayingStore];

        this.toggleTab = this.toggleTab.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    saveData() {
        this.setState({ unlockPrflInfo: false });
        const logData = {
            /*Burası Silinecek*/id: this.state.id,
            name: this.state.name,
            surname: this.state.surname,
            username: this.state.username,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            email: this.state.email
        }
        localStorage.clear();
        localStorage.setItem("loginData", JSON.stringify(logData));
        //Apiye loginDatayı göndereceğiz burada.

        window.location.reload(false);
    }

    renderProfileInfo() {
        const lockOrUnlock = this.state.unlockPrflInfo;
        const form = (
            <div>
                <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 90 }}>
                        Username: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Username"
                        value={this.state.username}
                        onChange={(val) => this.setState({ username: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup>
                <InputGroup size="sm" style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 90 }}>
                        Password: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={(val) => this.setState({ password: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup>
                <InputGroup size="sm" style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 90 }}>
                        Password </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Confirm Password"
                        type="password"
                        value={this.state.password_confirm}
                        onChange={(val) => this.setState({ password_confirm: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup>
                <InputGroup size="sm" style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 90 }}>
                        Name: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Name"
                        value={this.state.name}
                        onChange={(val) => this.setState({ name: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup>
                <InputGroup size="sm" style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 90 }}>
                        Surname: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Surname"
                        value={this.state.surname}
                        onChange={(val) => this.setState({ surname: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup>
                <InputGroup size="sm" style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend"><InputGroupText style={{ width: 90 }}>
                        Email: </InputGroupText></InputGroupAddon>
                    <Input
                        placeholder="Email"
                        value={this.state.email}
                        onChange={(val) => this.setState({ email: val.target.value })}
                        readOnly={!lockOrUnlock} />
                </InputGroup>
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
                                <ContentContainer title="Watched List">
                                    {this.state.playing ?
                                        <CardListMovie items="4" list={this.state.playing} />
                                        : "Loading..."}
                                </ContentContainer>
                                <Link to={{ pathname: "/watched-list", search: ("?id:" + this.state.id) }}>
                                    <Button
                                        size="lg"
                                        color="success"
                                        style={{ marginTop: -20, marginBottom: 10, width: '100%' }}
                                    >Show All Watched List</Button></Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <ContentContainer title="Watch Later">
                                    {this.state.playing ? <CardListMovie items="4" list={this.state.playing} /> : "Loading..."}
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
        return (
            <div>
                <NavigationBar />
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
            </div>
        );
    }
}
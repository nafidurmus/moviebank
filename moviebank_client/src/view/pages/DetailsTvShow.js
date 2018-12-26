import React, { Component } from 'react';
import NavigationBar from '../component/NavigationBar';
import {
    Col, Row,
    Container, Card,
    CardImg,
    CardBlock,
    CardBody,
    CardSubtitle,
    CardTitle,
    CardText,
    Button,
} from 'reactstrap';
import Reflux from 'reflux';
import Footer from '../component/Footer';
import { BrowserRouter as Router, Link } from "react-router-dom";

import { TvDetailsStore } from '../../controller/stores/TvDetailsStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { actions } from '../../actions';
import { Poster_Link } from '../../controller/utils/Api';
import UnknownProfile from '../image/unknown-profile.jpg';
import '../css/DetailsPage.css';
import NowPlaying from '../component/NowPlaying';

export default class DetailsTvShow extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = { showMoreBtnVisbltyCast: true, showMoreBtnVisbltyCrew: true };
        actions.getShowDetails(this.props.location.search.split(":")[1]);
        actions.getShowCredits(this.props.location.search.split(":")[1]);
        this.stores = [TvDetailsStore, BoxOfficeStore];
    }

    getCommadString(myString) {
        let newString = "";
        if (myString) {
            for (let i = 0; i < myString.length; i++) {
                if (i == myString.length - 1) {
                    newString += myString[i].name;
                } else {
                    newString += myString[i].name + ", ";
                }
            }
        }
        return newString;
    }

    renderCastCrewCard(data, choice) {
        let castOrCrew = "";
        if (choice == "cast")
            castOrCrew = (data.character ? <p>Role: {data.character}</p> : "");
        else if (choice == "crew")
            castOrCrew = <p>
                Department: {data.department} <br />
                Job: {data.job}
            </p>;

        return (
            <Link to={{ pathname: "/celeb-detail", search: "?id:" + data.id, }} style={{ textDecoration: 'none' }}>
                <Card style={{ width: 120, margin: 3 }}>
                    <CardImg top width="100%" style={{ height: 177 }} src={
                        (data.profile_path ? Poster_Link + data.profile_path : UnknownProfile)} alt="Photo" />
                    <CardBody style={{ padding: 10, minHeight: 80 }}>
                        <CardTitle style={{ fontSize: 12 }}>{data.name}</CardTitle>
                        <CardSubtitle style={{ fontSize: 10 }}>
                            {castOrCrew}
                        </CardSubtitle>
                    </CardBody>
                </Card>
            </Link>
        )
    }

    renderCredits(show_details) {
        let cast = "", crew = "";

        if (this.state.credits) {
            cast = (this.state.credits.cast.map((data) =>
                this.renderCastCrewCard(data, "cast")
            ))
            crew = (this.state.credits.crew.map((data) =>
                this.renderCastCrewCard(data, "crew")
            ))
        }

        return (
            <CardText className="overviewStyle">
                <hr /><h5>Overview</h5>
                {show_details.overview}
                {cast.length ? <div>
                    <hr /><h5>Cast</h5>
                    <Row>
                        {cast.slice(0, 10)}
                        {this.state.showMoreBtnVisbltyCast ?
                            <Button color="link" style={{ textDecoration: 'none' }} onClick={() => this.setState({ showMoreBtnVisbltyCast: false })}>Show More</Button>
                            : cast.slice(10)} {/* cast.slice(10) ile 10. itemden sonrakinleri alıyor. */}
                    </Row> </div> : ""}
                {crew.length ? <div><h5>Crew</h5>
                    <Row>
                        {crew.slice(0, 10)}
                        {this.state.showMoreBtnVisbltyCrew ?
                            <Button color="link" style={{ textDecoration: 'none' }} onClick={() => this.setState({ showMoreBtnVisbltyCrew: false })}>Show More</Button>
                            : crew.slice(10)}
                    </Row></div> : ""}
                {/* {this.state.credits ? this.state.credits.crew.map((data) =>
                    <Link to={{
                        pathname: "/celeb-detail",
                        search: "?id:" + data.id,
                        //state: { card: card, }
                    }}> {data.name + " (" + data.job + "), "}
                    </Link>) : ""} */}
            </CardText>
        )
    }

    renderContent() {
        const show_details = this.state.tv_details;

        let rendereds;
        rendereds = (
            <Card className="cardStyle">
                <CardTitle className="titleStyle"><b>{show_details.original_name}</b></CardTitle>
                <hr />
                <CardBlock /*style={{ border: '1px solid #d6d7da'}}*/>
                    <div>
                        <div style={{ float: 'left', width: '25%', }}>
                            <CardImg className="imgStyle" width={'100%'} src={Poster_Link + show_details.poster_path} />
                        </div>
                        {console.log(show_details)}
                        <div style={{ float: 'right', width: '70%', marginLeft: 10 }}>
                            <CardText><b>First Air Date: </b>{show_details.first_air_date}</CardText><hr />
                            <CardText><b>Last Air Date: </b>{show_details.last_air_date}</CardText><hr />
                            <CardText><b>Genres: </b>{this.getCommadString(show_details.genres)}</CardText><hr />
                            <CardText><b>Created By: </b>{this.getCommadString(show_details.created_by)}</CardText><hr />
                            {(show_details.number_of_seasons && show_details.number_of_episodes) ? <div><CardText><b>Number of Seasons and Episodes: </b>{show_details.number_of_seasons} Seasons, {show_details.number_of_episodes} Episodes</CardText><hr /></div> : ""}
                            {show_details.production_companies.length ? <div><CardText><b>Production Companies: </b>{this.getCommadString(show_details.production_companies)}</CardText><hr /></div> : ""}
                            <CardText><b>Networks: </b>{this.getCommadString(show_details.networks)}</CardText><hr />
                        </div>
                    </div>
                </CardBlock>
                <CardBlock>
                    {this.renderCredits(show_details)}
                </CardBlock>
                {/* <CardSubtitle className="subtitleStyle"></CardSubtitle> */}
            </Card>
        )

        return rendereds
    }

    render() {
        document.title = (this.state.tv_details) ? this.state.tv_details.original_name + " - MovieBank" : "MovieBank";
        return (
            <div>
                <NavigationBar />
                <Container fluid style={{ /*margin: 'auto',*/ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            {(this.state.tv_details && this.state.credits) ? this.renderContent() : <div></div>}
                        </Col>
                        <Col>
                            {this.state.boxOffice ? <NowPlaying boxOfficeData={this.state.boxOffice} /> : <div></div>}
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}
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
    Badge
} from 'reactstrap';
import Reflux from 'reflux';
import Footer from '../component/Footer';
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Youtube_Link } from '../../controller/utils/Api';
import { FilmDetailsStore } from '../../controller/stores/FilmDetailsStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { actions } from '../../actions';
import { Poster_Link } from '../../controller/utils/Api';
import UnknownProfile from '../image/unknown-profile.jpg';
import '../css/DetailsPage.css';
import NowPlaying from '../component/NowPlaying';
import StarRating from '../component/StarRating';

export default class DetailsFilm extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = { rating: "0", showMoreButtonVisiblity: true };
        this.giveRate = this.giveRate.bind(this);
        actions.getFilmDetails(this.props.location.search.split(":")[1]);
        actions.getFilmCredits(this.props.location.search.split(":")[1]);
        //Eğer "Link" vasıtasıyla "state" gönderildiyse: this.props.location.state.id
        actions.getVideos(this.props.location.search.split(":")[1]);
        this.stores = [FilmDetailsStore, BoxOfficeStore];
    }

    getCommadString(myString) {
        let newString = "";
        for (let i = 0; i < myString.length; i++) {
            if (i == myString.length - 1) {
                newString += myString[i].name;
            } else {
                newString += myString[i].name + ", ";
            }
        }
        return newString;
    }

    giveRate(newRating) {
        this.setState({
            rating: newRating
        });
    }

    renderCredits(film_details) {
        let cast = "";

        if (this.state.credits) {
            cast = (this.state.credits.cast.map((data) =>
                <Link to={{ pathname: "/celeb-detail", search: "?id:" + data.id, }} style={{ textDecoration: 'none' }}>
                    <Card style={{ width: 120, margin: 3 }}>
                        <CardImg top width="100%" style={{ height: 177 }} src={
                            (data.profile_path ? Poster_Link + data.profile_path : UnknownProfile)} alt="Photo" />
                        <CardBody style={{ padding: 10, minHeight: 80 }}>
                            <CardTitle style={{ fontSize: 12 }}>{data.name}</CardTitle>
                            <CardSubtitle style={{ fontSize: 10, color:"#000000" }}>{data.character}</CardSubtitle>
                        </CardBody>
                    </Card>
                </Link>))
        }

        return (
            <CardText className="overviewStyle">
                <hr /><h5>Overview</h5>
                {film_details.overview}
                <hr /><h5>Cast</h5>
                <Row>
                    {cast.slice(0, 10)}
                    {this.state.showMoreButtonVisiblity ?
                        <Button color="link" style={{ textDecoration: 'none' }} onClick={() => this.setState({ showMoreButtonVisiblity: false })}>Show More</Button>
                        : cast.slice(10)}
                </Row>
                <h5>Crew</h5>
                {this.state.credits ? this.state.credits.crew.map((data) =>
                    <Link to={{
                        pathname: "/celeb-detail",
                        search: "?id:" + data.id,
                        //state: { card: card, }
                    }}> {data.name + " (" + data.job + "), "}
                    </Link>) : ""}
            </CardText>
        )
    }

    renderBottomButtons(film_details) {
        return (
            <CardBlock >
                <Link to={{
                    pathname: "/comment-page",
                    search: ("?id:" + film_details.id), //"?film=" + card.title.replace(" ", "-")+ ""
                    //state: { id: card.id },
                }}>
                    <Button color="secondary" style={{ margin: 5 }}>
                        Comments
                        </Button>
                </Link>
                <Button color="success" style={{ margin: 5 }}>Watchlist</Button>
                <Button color="primary">Watch Later</Button>
            </CardBlock>
        )
    }

    renderContent() {
        const film_details = this.state.film_details;
        const videos = this.state.videos;
        var film_video = Youtube_Link;
        // console.log(this.state.videos);

        for (let i = 0; i < videos.length; i++) {
            if (videos[i].type.includes("Trailer")) {
                film_video += videos[i].key;
                // console.log(film_video);
                break;
            } else if (videos[i].type.includes("Teaser")) {
                film_video += videos[i].key;
                break;
            }
        }

        let rendereds;
        rendereds = (
            <Card className="cardStyle">
                <div className="embed-container"><iframe src={film_video} width="100%" height="100%" type="text/html" frameBorder="0" allowfullscreen></iframe></div>


                <CardTitle className="titleStyle"><b>{film_details.title}</b></CardTitle>
                <hr />
                <CardBlock /*style={{ border: '1px solid #d6d7da'}}*/>
                    <div>
                        <div style={{ float: 'left', width: '25%', }}>
                            <CardImg className="imgStyle" width={'100%'} src={Poster_Link + film_details.poster_path} />
                            <div className="bottomStyle">
                                <StarRating sendRate={this.giveRate} collapse={true} />
                                <Badge color="info" pill style={{ float: 'right', marginTop: '10%' }}>{this.state.rating} / 10</Badge>
                            </div>
                        </div>
                        <div style={{ float: 'right', width: '70%', marginLeft: 10 }}>
                            <CardText><b>Production Companies: </b>{this.getCommadString(film_details.production_companies)}</CardText><hr />
                            <CardText><b>Production Countries: </b>{this.getCommadString(film_details.production_countries)}</CardText><hr />
                            <CardText><b>Spoken Languages: </b>{this.getCommadString(film_details.spoken_languages)}</CardText><hr />
                            <CardText><b>Genres: </b>{this.getCommadString(film_details.genres)}</CardText><hr />
                            <CardText><b>Homepage: </b><a href={film_details.homepage}>{film_details.homepage}</a></CardText><hr />
                        </div>
                    </div>
                </CardBlock>
                <CardBlock>
                    {this.renderCredits(film_details)}
                </CardBlock>
                {this.renderBottomButtons(film_details)}
                {/* <CardSubtitle className="subtitleStyle"></CardSubtitle> */}
            </Card>
        )

        return rendereds
    }

    render() {
        document.title = (this.state.film_details) ? this.state.film_details.title + " - MovieBank" : "MovieBank";
        return (
            <div>
                <NavigationBar />
                <Container fluid style={{ /*margin: 'auto',*/ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            {(this.state.film_details && this.state.videos) ? this.renderContent() : <div></div>}
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
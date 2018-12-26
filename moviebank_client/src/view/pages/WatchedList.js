import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Reflux from 'reflux';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import NavigationBar from '../component/NavigationBar';
import TableListMovie from '../component/TableListMovie';
import NowPlaying from '../component/NowPlaying';
import Footer from '../component/Footer';
import { actions } from '../../actions';
import { getWatchedList, deleteFromWatchedList } from '../../controller/utils/UserApi';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { FilmDetailsStore } from '../../controller/stores/FilmDetailsStore';

export default class WatchedList extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [BoxOfficeStore, FilmDetailsStore];
        this.getLists = this.getLists.bind(this);
        this.getCheckedFilms = this.getCheckedFilms.bind(this);
        this.unlistFilms = this.unlistFilms.bind(this);
        this.redirect = this.redirect.bind(this);
        this.state = { deleteFilmArray: null, userFilms: null }
        this.getLists();
    }

    redirect() {
        alert("Please Login or Signup Firstly!")
        return <Redirect to={{
            pathname: '/'
        }} />
    }

    async getLists() {
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        if (loginData) {
            let movieIds = [];

            await getWatchedList(loginData.username).then(response => {
                for (let i = 0; i < response.data.watchlist.length; i++) {
                    movieIds.push(response.data.watchlist[i].watchlist_movie_id);
                }
                this.setState({ userFilms: response.data.watchlist })
                actions.getFilmDetailsForLists(movieIds);
            })


            //this.setState({ watchLaterList: this.state.filmDetailsForLists }) 
        }
    }

    unlistFilms() {
        //console.log(this.state.userFilms)
        for (let i = 0; i < this.state.userFilms.length; i++) {
            for (let j = 0; j < this.state.deleteFilmArray.length; j++) {
                if (this.state.userFilms[i].watchlist_movie_id == this.state.deleteFilmArray[j]) {
                    deleteFromWatchedList(this.state.userFilms[i].id)
                }
            }
        }
        window.location.reload(false);
    }

    getCheckedFilms(films) {
        this.setState({
            deleteFilmArray: films
        });
    }

    render() {
        document.title = "Watchlist";
        const loginInfo = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : "";
        return (
            <div>
                <NavigationBar />
                {loginInfo ?
                    <Container fluid style={{ margin: '3%', width: '94%', }}>
                        <Row>
                            {this.state.deleteFilmArray ? this.unlistFilms() : ""}
                            <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                                <h3 align="center">Watchlist</h3>
                                {this.state.filmDetailsForLists ? <TableListMovie films={this.state.filmDetailsForLists} deletable={true} getDeleteFilms={this.getCheckedFilms} /> : "Loading..."}
                            </Col>
                            <Col>
                                {this.state.boxOffice ? <NowPlaying boxOfficeData={this.state.boxOffice} /> : "Loading"}
                            </Col>
                        </Row>
                    </Container>
                    : this.redirect()}
                <Footer />

            </div>

        );
    }
}
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Reflux from 'reflux';
import NavigationBar from '../component/NavigationBar';
import TableListMovie from '../component/TableListMovie';
import NowPlaying from '../component/NowPlaying';
import Footer from '../component/Footer';
import { getRate } from '../../controller/utils/UserApi';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { Top100store } from '../../controller/stores/Top100Store';
import { FilmDetailsStore } from '../../controller/stores/FilmDetailsStore';
import { actions } from '../../actions';

export default class Top100 extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [/*Top100store, */FilmDetailsStore, BoxOfficeStore];
        this.state = { films: null }
        this.getTop100 = this.getTop100.bind(this);
        this.correctVoteData = this.correctVoteData.bind(this);
        this.getTop100();
    }

    getTop100() {
        let films = []
        getRate().then(response => {
            if (response.data.length != 0) {
                if (films.length == 0) {
                    films.push({
                        movieId: response.data[0].rating_movie_id,
                        movieRate: response.data[0].rating_value,
                        voteCounter: 1
                    })
                }
                for (let i = 1; i < response.data.length; i++) {
                    var length = films.length, found = false;
                    for (let j = 0; j < length; j++) {
                        if (response.data[i].rating_movie_id == films[j].movieId) {
                            films[j].voteCounter++;
                            films[j].movieRate += response.data[i].rating_value;
                            found = true;
                            break;
                        } else {
                            found = false;
                        }
                    }
                    if (found == false) {
                        films.push({
                            movieId: response.data[i].rating_movie_id,
                            movieRate: response.data[i].rating_value,
                            voteCounter: 1
                        })
                    }
                }
                for (let i = 0; i < films.length ; i++) { films[i].movieRate /= films[i].voteCounter; } 
                films.sort((a,b) => (a.movieRate > b.movieRate) ? -1 : ((b.movieRate > a.movieRate) ? 1 : 0))
                const filmsForTable = JSON.parse(JSON.stringify(films));
                for(let i = 0; i < films.length; i++){ films[i] = films[i].movieId; }
                actions.getFilmDetailsForLists(films);
                //console.log(filmsForTable)
                this.setState({ films : filmsForTable })
        }
        })
        
    }

    correctVoteData(){
        var filmDetailedList = this.state.filmDetailsForLists;
        for(let i = 0; i < filmDetailedList.length; i++){
            filmDetailedList[i].vote_average = this.state.films[i].movieRate;
            filmDetailedList[i].vote_count = this.state.films[i].voteCounter;
        }
        console.log(filmDetailedList)
        return <TableListMovie films={filmDetailedList} deletable={false} />
    }

    render() {
        document.title = "Top 100 - MovieBank";
        return (
            <div>
                <div><NavigationBar /></div>
                
                <Container fluid style={{ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            <h3 align="center">Top Rated Movies</h3>
                            {(this.state.filmDetailsForLists && this.state.films) ? this.correctVoteData() : ""}
                        </Col>
                        <Col>
                            {this.state.boxOffice ? <NowPlaying boxOfficeData={this.state.boxOffice} /> : ""}
                        </Col>
                    </Row>
                </Container>
                <Footer />

            </div>

        );
    }
}
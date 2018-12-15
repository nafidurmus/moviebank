import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Reflux from 'reflux';
import NavigationBar from '../component/NavigationBar';
import TableListMovie from '../component/TableListMovie';
import TableListCeleb from '../component/TableListCeleb';
import TableListTv from '../component/TableListTv';
import NowPlaying from '../component/NowPlaying';
import Footer from '../component/Footer';
import { actions } from '../../actions';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { SearchResultsStore } from '../../controller/stores/SearchResultsStore';

export default class SearchResults extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = { searchQuery: "" };
        this.stores = [BoxOfficeStore, SearchResultsStore];
        this.trigger = this.trigger.bind(this);
        this.renderAsType = this.renderAsType.bind(this);
        // console.log(this.props.location.state.results)
        this.trigger();
    }

    trigger() {
        var search = this.props.location.search.split(":")[1];
        search = search.substring(0, search.lastIndexOf("&"));

        this.setState({ searchQuery: this.props.location.search });
        this.renderAsType(search);
        //this.search(this.props.location.search.split(":")[1]);
    }

    renderAsType(searchText) {
        var type = this.props.location.search.split(":")[2]
        if (type == "All") {
            actions.getMultiResults(searchText);
        } else if (type == "Movies") {
            actions.getMovieResults(searchText);
            this.setState({ personResults: '', tvResults: '' })
        } else if (type == "People") {
            actions.getPersonResults(searchText);
            this.setState({ movieResults: '', tvResults: '' })
        } else if (type == "Tv") {
            actions.getTvResults(searchText);
            this.setState({ movieResults: '', personResults: '' })
        }
    }

    render() {
        document.title = "Search Results - MovieBank";

        var search = this.props.location.search;
        return (
            <div>
                <div><NavigationBar /></div>

                <Container fluid style={{ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            <h3 align="center">Search Results</h3>
                            {(this.state.searchQuery != search) ? this.trigger() : ""}
                            {this.state.movieResults.length ?
                                <div>
                                    <h3>Movies</h3>
                                    <TableListMovie films={this.state.movieResults} />
                                </div> : ""}
                            {this.state.personResults.length ?
                                <div>
                                    <h3>People</h3>
                                    <TableListCeleb celebs={this.state.personResults} />
                                </div> : ""}
                            {this.state.tvResults.length ?
                                <div>
                                    <h3>Tv</h3>
                                    <TableListTv tvShows={this.state.tvResults} />
                                </div> : ""}

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
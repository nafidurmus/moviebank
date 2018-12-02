import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Reflux from 'reflux';
import NavigationBar from '../component/NavigationBar';
import TableListMovie from '../component/TableListMovie';
import NowPlaying from '../component/NowPlaying';
import Footer from '../component/Footer';
import { Fetch } from '../../controller/utils/Api';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';

export default class SearchResults extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = { searchText: "", searchResults: "" };
        this.stores = [BoxOfficeStore];
        this.search = this.search.bind(this);
        this.trigger = this.trigger.bind(this);
        // console.log(this.props.location.state.results)
        this.trigger();
    }

    trigger(){
        this.setState({ searchText: this.props.location.search.split(":")[1] });
        this.search(this.props.location.search.split(":")[1]);
    }
    // Arama sonuçlarını axios ile istek gönderip alan fonksiyon.
    async search(searchText){
        const results = [];
        for (let i = 1; i < 6; i++) {
            await Fetch('search/movie', "&page=" + i + "&query=" + searchText).then(function (response) {
                results.push(response.data.results);
            }.bind(this))
        }
        var merged = [].concat.apply([], results);
        await this.setState({ searchResults: merged });
    }

    render() {
        document.title = "Search Results - MovieBank";
        return (
            <div>
                <div><NavigationBar /></div>

                <Container fluid style={{ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            <h3 align="center">Search Results</h3>
                            {(this.state.searchText != this.props.location.search.split(":")[1]) ? this.trigger() : ""}
                            {this.state.searchResults.length ? <TableListMovie films={this.state.searchResults} /> : <div align="center">There is nothing found in this keyword :(</div>}
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
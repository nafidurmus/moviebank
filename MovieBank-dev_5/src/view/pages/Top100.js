import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Reflux from 'reflux';
import NavigationBar from '../component/NavigationBar';
import TableListMovie from '../component/TableListMovie';
import NowPlaying from '../component/NowPlaying';
import Footer from '../component/Footer';
import { NewsStore } from '../../controller/stores/NewsStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { Top100store } from '../../controller/stores/Top100Store';

export default class Top100 extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [Top100store, BoxOfficeStore];
    }

    render() {
        document.title="Top 100 - MovieBank";
        return (
            <div>
                <div><NavigationBar /></div>

                <Container fluid style={{ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            <h3 align="center">Top Rated Movies</h3>
                            {this.state.top100 ? <TableListMovie films={this.state.top100} /> : <div></div>}
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
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Reflux from 'reflux';
import NavigationBar from '../component/NavigationBar';
import TableListMovie from '../component/TableListMovie';
import NowPlaying from '../component/NowPlaying';
import Footer from '../component/Footer';
import { NewsStore } from '../../controller/stores/NewsStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';

export default class Upcoming extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [NewsStore, BoxOfficeStore];
    }

    render() {
        document.title="Upcoming - MovieBank";
        return (
            <div>
                <div><NavigationBar /></div>

                <Container fluid style={{ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            <h3 align="center">Upcoming</h3>
                            {this.state.news ? <TableListMovie films={this.state.news} deletable={false}/> : <div></div>}
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
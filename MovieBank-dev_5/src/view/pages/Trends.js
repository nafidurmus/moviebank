import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Reflux from 'reflux';
import NavigationBar from '../component/NavigationBar';
import TableListMovie from '../component/TableListMovie';
import NowPlaying from '../component/NowPlaying';
import Footer from '../component/Footer';
import { PlayingStore } from '../../controller/stores/PlayingStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';

export default class Trends extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [PlayingStore, BoxOfficeStore];
    }
 
    render() {
        document.title = "Weekly Trends - MovieBank";
        return (
            <div>
                <div><NavigationBar /></div>

                <Container fluid style={{ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            <h3 align="center">Weekly Trends</h3>
                            {this.state.playing ? <TableListMovie films={this.state.playing} deletable={false}/> : <div></div>}
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
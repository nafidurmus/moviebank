import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Reflux from 'reflux';
import NavigationBar from '../component/NavigationBar';
import TableListCeleb from '../component/TableListCeleb';
import NowPlaying from '../component/NowPlaying';
import Footer from '../component/Footer';
import { CelebsStore } from '../../controller/stores/CelebStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';

export default class PopularCelebs extends Reflux.Component {

    constructor(props) {
        super(props);
        this.stores = [CelebsStore, BoxOfficeStore];
    }
 
    render() {
        document.title = "Popular Celebs - MovieBank";
        return (
            <div>
                <div><NavigationBar /></div>

                <Container fluid style={{ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            <h3 align="center">Popular Celebs</h3>
                            {this.state.celebs ? <TableListCeleb celebs={this.state.celebs}/> : <div></div>}
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
import React, { Component } from 'react';
import {
    Container, Col, Row
} from 'reactstrap';
import NavigationBar from '../component/NavigationBar';
import CardListMovie from '../component/CardListMovie';
import CardListCeleb from '../component/CardListCeleb';
import Footer from '../component/Footer';
import ContentContainer from '../component/ContentContainer';
import Reflux from 'reflux';
import { PlayingStore } from '../../controller/stores/PlayingStore';
import { NewsStore } from '../../controller/stores/NewsStore';
import { CelebsStore } from '../../controller/stores/CelebStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import NowPlaying from '../component/NowPlaying';


export default class HomePage extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [PlayingStore, NewsStore, CelebsStore, BoxOfficeStore];
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <div style={{ margin: '3%' }} className="w-screen">
                    <Container fluid>
                        <Row>
                            <Col sm={12} md={8} lg={9}>
                                <ContentContainer title="Trending of this week">
                                    {this.state.playing ? <CardListMovie items={4} list={this.state.playing} /> : "Loading..."}
                                    {/* console.log(this.state.playing) */}
                                </ContentContainer>

                                <ContentContainer title="Upcoming">
                                    {this.state.news ? <CardListMovie items={4} list={this.state.news} /> : "Loading..."}
                                </ContentContainer>

                                <ContentContainer title="Popular Celebs of this week" style={{ height: 700 }}>
                                    {this.state.celebs ? <CardListCeleb list={this.state.celebs} /> : "Loading..."}
                                </ContentContainer>
                            </Col>
                            <Col>
                                {this.state.boxOffice ? <NowPlaying boxOfficeData={this.state.boxOffice} /> : "Loading..."}
                                {/* {this.state.news ? <CardList list={this.state.news} /> : <div></div>} */}

                            </Col>
                        </Row>


                    </Container>
                    <Footer />
                </div>
            </div>
        );
    }
}
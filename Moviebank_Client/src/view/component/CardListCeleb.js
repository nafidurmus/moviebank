import React, { Component } from 'react';
import {
    Col, Card,
    CardImg,
    CardBlock,
    CardTitle,
    CardSubtitle,
    CardText,
    Badge
} from 'reactstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import TinySlider from "tiny-slider-react";
import styles from '../css/cardsStylings';
import $ from 'jquery';

import UnknownProfile from '../image/unknown-profile.jpg';
import { Poster_Link } from '../../controller/utils/Api';


export default class FilmListesi extends Component {


    mapTheCards(cards) {
        return (
            cards.slice(0, 4).map((card) =>
                <Col xs={12} sm={8} md={6} lg={3} xl={12} className="mb-0">
                    <Card style={styles.cardStyle} style={{ minHeight:260 }}>
                        <Link to={{
                            pathname: "/celeb-detail",
                            search: "?id:" + card.id,
                            //state: { card: card, }
                        }}>

                            <div style={styles.container}>
                                <CardImg style={styles.imgStyle} src={(card.profile_path) ? (Poster_Link + card.profile_path) : UnknownProfile} />
                                <div style={styles.textBlock}>
                                    <CardTitle style={styles.nameStyle}><b>{card.name}</b></CardTitle>
                                </div>
                            </div>
                            </Link>
                            {/* <CardBlock style={{ border: '1px solid #d6d7da' }}>
                            </CardBlock> */}
                            {/* <CardSubtitle style={styles.subtitleStyle}>
                                <div style={styles.bottomStyle}>
                                <CardText style={{ color: '#3f6cb5', float: 'left'}}>Popularity </CardText> 
                                <Badge color="info" pill style={{ float: 'right' }}>{card.popularity}</Badge> 
                                
                                </div>
                            </CardSubtitle> */}
                        
                    </Card>
                </Col>
            )
        );
    }

    render() {
        const cards = this.props.list;

        const settings = {
            lazyload: true,
            nav: false,
            mouseDrag: true,
            fixedWidth: 210,
            touch: true,
            controls: false,
            loop: false,
            gutter: 10,
            // autoplay: true, 
            // autoplayTimeout: 1000,
            speed: 50,
            responsive: {
                320: {
                    items: 1,
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }

            },
        };

        return (
            <div>
                {/* <button type="button" onClick={() => this.onGoTo('prev')} >Previous</button>
                <button type="button" onClick={() => this.onGoTo('next')}>Next</button> */}
                <TinySlider settings={settings} /*ref={ts => this.ts = ts}*/>
                    {this.mapTheCards(cards)}
                </TinySlider>
            </div>
        );
    }
}


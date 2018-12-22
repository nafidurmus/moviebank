import React, { Component } from 'react';
import {
    Col, Card,
    CardImg,
    CardBlock,
    CardTitle,
    CardSubtitle,
    CardText,
    Badge,
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import TinySlider from "tiny-slider-react";
import styles from '../css/cardsStylings';
import $ from 'jquery';

import { Poster_Link } from '../../controller/utils/Api';
import nullMovie from '../image/nullMovie.png';

export default class FilmListesi extends Component {

    mapTheCards(cards) {
        return (
            cards.slice(0, this.props.items).map((card) =>
                <Col xs={12} sm={8} md={6} lg={3} xl={12} className="mb-0">
                    <Card style={styles.cardStyle}>
                        <Link to={{
                            pathname: "/film-detail",
                            search: ("?id:" + card.id), //"?film=" + card.title.replace(" ", "-")+ ""
                            //state: { id: card.id },
                        }}>
                            <div style={styles.container}>
                                <CardImg width={'100%'} style={styles.imgStyle} src={(card.poster_path) ? (Poster_Link + card.poster_path) : nullMovie} />
                                <div style={styles.textBlock}>
                                    <CardTitle style={styles.nameStyle}><b>{card.title}</b></CardTitle>
                                </div>
                            </div>

                        </Link>
                        {/* <CardBlock style={{ border: '1px solid #d6d7da' }}>
                            <Link to={{
                                pathname: "/film-detail",
                                search: ("?id:" + card.id),
                                //state: { id: card.id }
                            }}>
                                
                            </Link>
                            <CardText style={styles.overviewStyle}>{card.overview.length > 100 ? card.overview.substring(0, 99) + "..." : card.overview}</CardText>
                        </CardBlock> */}
                        <CardSubtitle style={styles.subtitleStyle}>
                            <div style={styles.bottomStyle}>
                                <StarRatings
                                    starDimension={'15px'}
                                    starSpacing={'0px'}
                                    rating={(card.vote_average / 2)}
                                    starRatedColor="#5ba0ad"
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    name='rating'

                                    style={{float: 'left'}}
                                /><Badge color="info" pill style={{ float: 'right' }}>{card.vote_average}</Badge>
                            </div>
                        </CardSubtitle>
                    </Card>
                </Col>
            )
        );
    }

    // onGoTo = dir => this.ts.slider.goTo(dir)

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
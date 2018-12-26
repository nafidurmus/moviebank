import React, { Component } from 'react';
import {
    Col,
    Row
} from 'reactstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class NowPlaying extends Component {
    render() {
        return (
            <div style={style.ctStyle}>
                <h5>Box Office (Now Playing)</h5>
                <hr className="my-2" />

                {this.props.boxOfficeData.map((film) =>
                    <Col>
                        <Row>
                            <Link to={{
                                pathname: "/film-detail",
                                search: "?id:" + film.id,
                                //state: { card: card, }
                            }} onClick={this.forceUpdate}>
                            <p style={style.titleStyle}>{film.title}</p>
                            </Link>
                        </Row>
                        <Row style={style.RowStyle}>
                            <p style={style.releaseStyle}>({film.release_date})</p>
                        </Row>
                    </Col>
                )}

            </div>
        );
    }
}

const style = {
    ctStyle: {
        backgroundColor: '#eeeeee',
        minHeight: 500,
        border: '1px solid #d6d7da',
        borderRadius: 5,
        padding: 20,
        marginBottom: 30,
    },
    titleStyle: {
        color: '#6486bc',
        fontWeight: 'bold',
        fontSize: 15,
    },
    releaseStyle: {
        color: '#8a8a8a',
        fontSize: 10,
    },
    RowStyle: {
        marginTop: -20,
    }
}
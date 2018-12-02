import React, { Component } from 'react';
import {
    Table,
    Media,
} from 'reactstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Poster_Link } from './../../controller/utils/Api';

export default class NowPlaying extends Component {
    
    render() {
        return (
            <div>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>#</th>
                            <th style={{ width: '10%' }}>Poster</th>
                            <th style={{ width: '50%' }}>Title</th>
                            <th style={{ width: '10%' }}>Date</th>
                            <th style={{ width: '10%' }}>Vote Average</th>
                            <th style={{ width: '10%' }}>Vote Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.films.map((film, index) =>
                            <tr>
                                <th style={{ width: '10%' }}>{index + 1}</th>
                                <th style={{ width: '10%' }}>{(film.poster_path) ?
                                    <Media object src={Poster_Link + film.poster_path} alt="No Poster" style={{ maxHeight: 80 }}/> : ""}
                                </th>
                                <th style={{ width: '50%' }}>
                                    <Link to={{
                                        pathname: "/film-detail",
                                        search: "?id:" + film.id,
                                        //state: { card: card, }
                                    }}>
                                        {film.title}
                                    </Link>
                                </th>
                                <th style={{ width: '10%' }}>{film.release_date}</th>
                                <th style={{ width: '10%' }}>{film.vote_average}</th>
                                <th style={{ width: '10%' }}>{film.vote_count}</th>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        );
    }
}
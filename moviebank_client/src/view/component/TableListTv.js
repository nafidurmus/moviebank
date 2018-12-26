import React, { Component } from 'react';
import {
    Table,
    Media,
} from 'reactstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Poster_Link } from './../../controller/utils/Api';

export default class TableListTv extends Component {

    render() {
        return (
            <div>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>#</th>
                            <th style={{ width: '10%' }}>Poster</th>
                            <th style={{ width: '50%' }}>Name</th>
                            <th style={{ width: '20%' }}>First Air Date</th>
                            <th style={{ width: '10%' }}>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tvShows.map((tvShow, index) =>
                            <tr>
                                <th style={{ width: '10%' }}>{index + 1}</th>
                                <th style={{ width: '10%' }}>{(tvShow.poster_path) ?
                                    <Media object src={Poster_Link + tvShow.poster_path} alt="Loading" style={{ maxHeight: 80 }} /> : ""}
                                </th>
                                <th style={{ width: '50%' }}>
                                    <Link to={{
                                        pathname: "/tv-show-detail",
                                        search: "?id:" + tvShow.id,
                                        //state: { card: card, }
                                    }}>
                                        {tvShow.original_name}
                                    </Link>
                                </th>
                                <th style={{ width: '20%' }}>{tvShow.first_air_date}</th>
                                <th style={{ width: '10%' }}>{tvShow.original_language}</th>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        );
    }
}
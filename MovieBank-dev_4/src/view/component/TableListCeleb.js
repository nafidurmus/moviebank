import React, { Component } from 'react';
import {
    Table,
    Media,
} from 'reactstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Poster_Link } from './../../controller/utils/Api';

export default class TableListCeleb extends Component {

    celebKnownMap(films) {
        let data = [];
        films.map(film => 
            film.original_title ? data.push(
                <Link to={{
                    pathname: "/film-detail",
                    search: "?id:" + film.id,
                    //state: { card: card, }
                }}>
                   {film.original_title}
                </Link>
                
                
                ) : ""
            )
        for(let i = 0 ; i < data.length; i++){
            data[i] = <p>⚫ {data[i]}</p> ;
        }
        return data;
        
    }

    render() {
        return (
            <div>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>#</th>
                            <th style={{ width: '10%' }}>Photo</th>
                            <th style={{ width: '30%' }}>Name</th>
                            <th style={{ width: '40%' }}>Known With</th>
                            <th style={{ width: '10%' }}>Known Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.celebs.map((celeb, index) =>
                            <tr>
                                <th style={{ width: '10%' }}>{index + 1}</th>
                                <th style={{ width: '10%' }}>{(celeb.profile_path) ?
                                    <Media object src={Poster_Link + celeb.profile_path} alt="No Poster" style={{ maxHeight: 120 }} /> : <div></div>}
                                </th>
                                <th style={{ width: '30%' }}>
                                    <Link to={{
                                        pathname: "/celeb-detail",
                                        search: "?id:" + celeb.id,
                                        //state: { card: card, }
                                    }}>
                                        {celeb.name}
                                    </Link>
                                </th>
                                <th style={{ width: '40%' }}>{this.celebKnownMap(celeb.known_for)}</th>
                                <th style={{ width: '10%' }}>{celeb.known_for_department}</th>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        );
    }
}
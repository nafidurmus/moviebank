import React, { Component } from 'react';
import {
    Table,
    Media,
    Button
} from 'reactstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Poster_Link } from './../../controller/utils/Api';

export default class TableListMovie extends Component {

    constructor() {
        super();
    
        this.state = { checked: [] };
        this.handleChange = this.handleChange.bind(this);
        this.sendDeleteFilms = this.sendDeleteFilms.bind(this);
      }

      handleChange = (e) => {
          e.persist();
         this.setState( prevState => ({
            checked: [...prevState.checked, e.target.name]
          }))
            //checked: this.state.checked.push(e.target.name)})
        //console.log(e.target.name)
      }

      sendDeleteFilms() {
        this.props.getDeleteFilms(this.state.checked);
    }

    render() {
        return (
            <div>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>#</th>
                            <th style={{ width: '10%' }}>Poster</th>
                            
                            <th style={ (this.props.deletable==true) ? {width: '40%'} :
                                 { width: '50%' }}>Title</th>
                            <th style={{ width: '10%' }}>Date</th>
                            <th style={{ width: '10%' }}>Vote Average</th>
                            <th style={{ width: '10%' }}>Vote Count</th>
                            {(this.props.deletable==true) ? <th style={{ width: '10%' }}>Delete</th> : ""}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.films.map((film, index) =>
                            <tr>
                                <th style={{ width: '10%' }}>{index + 1}</th>
                                <th style={{ width: '10%' }}>{(film.poster_path) ?
                                    <Media object src={Poster_Link + film.poster_path} alt="Loading" style={{ maxHeight: 80 }}/> : ""}
                                </th>
                                <th style={ (this.props.deletable==true) ? { width: '40%' } :
                                    { width: '50%'}
                                    }>
                                    <Link to={{
                                        pathname: "/film-detail",
                                        search: "?id:" + film.id,
                                        //state: { card: card, }
                                    }}>
                                        {film.original_title}
                                    </Link>
                                </th>
                                <th style={{ width: '10%' }}>{film.release_date}</th>
                                <th style={{ width: '10%' }}>{parseFloat(Math.round(film.vote_average * 100) / 100).toFixed(1)}</th>
                                <th style={{ width: '10%' }}>{film.vote_count}</th>
                                {(this.props.deletable==true) ? 
                                <th style={{ width: '10%', textAlign: 'center' }}>
                                <input type="checkbox" name={film.id} onChange={this.handleChange}/>
                                </th> : "" }
                            </tr>
                        )}
                    </tbody>
                </Table>
                {this.props.deletable ? <Button color="danger" style={{width: '100%'}} onClick={this.sendDeleteFilms}>Delete Selected Items</Button> : ""}
            </div>
        );
    }
}
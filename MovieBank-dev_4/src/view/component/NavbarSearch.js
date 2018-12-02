import React from 'react';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

import './../css/NavbarArama.css';

export default class NavbarSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchText: "", redirect: false };

        this.search = this.search.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    search() {
        this.setState({ redirect: true });
        return this.redirect();
    };

    redirect() {
        if(this.state.redirect){
            return <Redirect to={{
                pathname: '/search-results',
                search: "?keyword:" + this.state.searchText,
                // state: { results: this.state.searchResults }
            }} />
        }
    }

    updateInputValue(evt) {
        this.setState({
            searchText: evt.target.value,
            redirect: false
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.search();
        }
    }

    render() {
        return (
            <div style={{ width: '100%', minWidth:280 }}>
                <InputGroup size="sm" style={{ width: '100%', height:'40%' }}>
                    <Input placeholder="Find Movies" value={this.state.searchText} onChange={evt => this.updateInputValue(evt)} onKeyPress={this.handleKeyPress}/>
                    <InputGroupAddon addonType="append">
                    <Button className="button" color="info" onClick={this.search}></Button>
                    {this.redirect()}
                    </InputGroupAddon>      
                </InputGroup>
            </div>
        );
    }
}

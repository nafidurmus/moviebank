import React from 'react';
import {
    InputGroup, InputGroupAddon, Input, Button,
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

import './../css/NavbarArama.css';

export default class NavbarSearch extends React.Component {
    constructor(props) {
        super(props);

        var search = window.location.search.split(":")[1];
        search = search ? search.substring(0, search.lastIndexOf("&")) : "";

        this.state = {
            redirect: false, dropdownOpen: false,
            searchText: (search ? search.replace(/%20/g, " ") : ""),
            searchType: (window.location.search.split(":")[2] ? window.location.search.split(":")[2] : "All"),
        };

        this.toggleSearchTypeDropdown = this.toggleSearchTypeDropdown.bind(this);
        this.search = this.search.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        if (search) this.redirect();
    }

    toggleSearchTypeDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    search() {
        this.setState({ redirect: true });
        return this.redirect();
    };

    redirect() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/search-results',
                search: "?keyword:" + this.state.searchText + "&type:" + this.state.searchType,
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
            <div style={{ width: '100%', minWidth: 280 }}>
                <InputGroup size="sm" style={{ width: '100%', height: '40%' }}>
                    <Input placeholder="Search" value={this.state.searchText} onChange={evt => this.updateInputValue(evt)} onKeyPress={this.handleKeyPress} />
                    <InputGroupAddon addonType="append">

                        <ButtonDropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggleSearchTypeDropdown}>
                            <DropdownToggle size="sm" style={{ borderRadius: 0, width: 70, fontSize: 13 }} /*caret*/>
                                {this.state.searchType}
                            </DropdownToggle>
                            <DropdownMenu style={{ borderRadius: 0 }} right>
                                <DropdownItem onClick={() => this.setState({ searchType: "All" })}>All</DropdownItem>
                                <DropdownItem onClick={() => this.setState({ searchType: "Movies" })}>Movies</DropdownItem>
                                <DropdownItem onClick={() => this.setState({ searchType: "People" })}>People</DropdownItem>
                                <DropdownItem onClick={() => this.setState({ searchType: "Tv" })}>Tv</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <Button className="button" color="info" onClick={this.search}></Button>
                        {this.redirect()}
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}

import React, { Component } from 'react';
import {
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
} from 'reactstrap';
import StarRatings from 'react-star-ratings';

import '../css/DetailsPage.css';

export default class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = { rating: 0, dropdownOpen: null };
        this.changeRating = this.changeRating.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });

        this.props.sendRate(newRating);
    }

    stars() {
        return (
            <StarRatings
                style={{ float: 'left' }}
                starDimension={'20px'}
                starSpacing={'0px'}
                rating={this.state.rating}
                starEmptyColor="#9b9b9b"
                starRatedColor="#0080d1"
                starHoverColor="#009dff"
                name='rating'
                changeRating={this.changeRating}
                numberOfStars={10}
            />);
    }

    withCollapse() {
        return (
            <UncontrolledDropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} style={{ float: 'left' }}>
                <DropdownToggle size="sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 0 }}>
                    <div className="dropdownStyle"></div>
                </DropdownToggle>
                <DropdownMenu down style={{ backgroundColor: '#fcfcfc', borderWidth: 2, width: 215, padding: 5 }}>
                    {this.stars()}
                </DropdownMenu>
            </UncontrolledDropdown>)
    }

    render() {
        return (
            <div>
                {this.props.collapse ? this.withCollapse() : this.stars()}
            </div>


        );
    }
}




/*
//Bu componenti kullanacağımız sayfada oy verebilme özelliği için aşağıdaki fonksiyonu kullanmak gerekiyor.

giveRate(newRating) {
        this.setState({
            rating: newRating
        });
    }
*/
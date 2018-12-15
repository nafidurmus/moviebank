import React, { Component } from 'react';
import NavigationBar from '../component/NavigationBar';
import {
    Col, Card,
    CardImg, Row,
    Container,
    CardBlock,
    CardTitle,
    CardSubtitle,
    CardText,
    Badge
} from 'reactstrap';
import Reflux from 'reflux';
import { CelebsStore } from '../../controller/stores/CelebStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { actions } from '../../actions';
import { Poster_Link } from '../../controller/utils/Api';
import NowPlaying from '../component/NowPlaying';
import Footer from '../component/Footer';
import UnknownProfile from '../image/unknown-profile.jpg';
import '../css/DetailsPage.css';

export default class DetailsCeleb extends Reflux.Component {
    constructor(props) {
        super(props);
        actions.getCelebDetails(this.props.location.search.split(":")[1]);
        this.stores = [CelebsStore, BoxOfficeStore];
    }


    dateConverter(myString) {
        let formatted = myString.split("-")[2] + " ";

        switch (myString.split("-")[1]) {
            case "01": formatted += "January, "; break;
            case "02": formatted += "February, "; break;
            case "03": formatted += "March, "; break;
            case "04": formatted += "April, "; break;
            case "05": formatted += "May, "; break;
            case "07": formatted += "July, "; break;
            case "06": formatted += "June, "; break;
            case "08": formatted += "August, "; break;
            case "09": formatted += "September, "; break;
            case "10": formatted += "October, "; break;
            case "11": formatted += "November, "; break;
            case "12": formatted += "December, "; break;
        }
        formatted += myString.split("-")[0];
        return formatted;
    }

    renderContent() {
        const celeb_details = this.state.celebDetails;


        let rendereds;
        rendereds = (
            <Card className="cardStyle">
                <CardTitle className="titleStyle"><b>{celeb_details.name}</b></CardTitle>
                <hr />
                <CardBlock /*style={{ border: '1px solid #d6d7da'}}*/>
                    <div style={{ minHeight: 300 }}>
                        <div style={{ float: 'left', width: '20%' }}>
                            <CardImg className="imgStyle" width={'100%'} src={celeb_details.profile_path ? Poster_Link + celeb_details.profile_path : UnknownProfile} />
                        </div>
                        <div style={{ float: 'right', width: '75%', marginLeft: 10 }}>
                            <CardText><b>Place of birth: </b>{celeb_details.place_of_birth ? celeb_details.place_of_birth : "Unknown"}</CardText>
                            <CardText><b>Born: </b>{celeb_details.birthday ? this.dateConverter(celeb_details.birthday) : "Unknown"}</CardText>
                            {celeb_details.deathday ? <div><CardText><b>Died: </b>{celeb_details.deathday ? this.dateConverter(celeb_details.deathday) : ""}</CardText><br /></div> : ""}
                            <CardText><b>Known with: </b>{celeb_details.known_for_department ? celeb_details.known_for_department : "Unknown"}</CardText>
                            {(celeb_details.homepage) ? <div><CardText><b>Homepage: </b><a href={celeb_details.homepage}>{celeb_details.homepage ? celeb_details.homepage : "Unknown"}</a></CardText></div> : ""}
                        </div>
                    </div>
                    <hr /><CardText className="overviewStyle"><b>Biography</b><br /> {celeb_details.biography}</CardText>
                </CardBlock>
                {/* <CardSubtitle className="subtitleStyle">
                    <div className="bottomStyle">
                        <Badge color="info" pill style={{ float: 'right' }}>{celeb_details.popularity}</Badge>
                    </div>
                </CardSubtitle> */}
            </Card>
        )

        return rendereds
    }

    render() {
        document.title = (this.state.celebDetails) ? this.state.celebDetails.name + " - MovieBank" : "MovieBank";
        return (
            <div>

                <NavigationBar />
                <Container fluid style={{ /*margin: 'auto',*/ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            {(this.state.celebDetails) ? this.renderContent() : <div></div>}
                        </Col>
                        <Col>
                            {this.state.boxOffice ? <NowPlaying boxOfficeData={this.state.boxOffice} /> : <div></div>}
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}
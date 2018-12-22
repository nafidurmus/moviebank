import React from 'react';
import {
    Container, Row, Col, CardImg, CardTitle, Badge
} from 'reactstrap';
import CommentBox from '../component/CommentBox';
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/Footer';
import Reflux from 'reflux';
import { FilmDetailsStore } from '../../controller/stores/FilmDetailsStore';
import { Poster_Link } from '../../controller/utils/Api';
import { actions } from '../../actions';
import { getComments, getRate } from '../../controller/utils/UserApi';


export default class CommentPage extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = { comments: null, rates: null };
        actions.getFilmDetails(this.props.location.search.split(":")[1]);
        this.stores = [FilmDetailsStore];
        this.getData = this.getData.bind(this);
        this.findRates = this.findRates.bind(this);
        this.getData();
    }

    getData(){
        getComments().then(response => {
            this.setState({ comments: response.data })
        })

        getRate().then(response => {
            this.setState({ rates: response.data })
        })
        
    }

    findRates(username, film_id){  
        if(this.state.rates) {
            var rates = this.state.rates;
            for(let i = 0 ; i < rates.length; i++ ){
                if(rates[i].user.username == username && rates[i].rating_movie_id == film_id){
                    //console.log(rates[i].rating_value)
                    return rates[i].rating_value;
                }
            }
        }
    }

    comments() {
        //console.log(this.state.comments)
        let allComments = null;
        if(this.state.comments) {
            allComments = this.state.comments.map((data) => 
                (data.comment_movie_id==this.props.location.search.split(":")[1]) ? 
                <Container fluid style={{ marginTop: '2%', border: "1px solid #d6d7da", backgroundColor: "#ffffff", borderRadius: 10, padding:20 }}>
                    {/*console.log(data)*/}
                    <h5><p><Badge color="info" pill style={{ marginRight: 30 }}>{this.findRates(data.user.username, data.comment_movie_id)} / 10</Badge><b>{data.user != null ? data.user.username : "Anonym"}</b></p></h5>
                    <p className="lead">{data.comment_title}</p>
                    <p>{data.comment_body}</p>
                </Container> : ""
            )
        } 
        return allComments;
    }

    rendereds() {
        const film_details = this.state.film_details;
        document.title = this.state.film_details.title + " - Comments";

        return (
            <Row>
                <Col sm={12} md={12} lg={12} style={styles.columnStyle}>
                    <CardTitle className="titleStyle"><b>{film_details.title}</b></CardTitle>
                    <Row style={{ marginBottom: 20 }}>
                        <Col sm="2" style={{marginBottom: 20}}>
                            <CardImg className="imgStyle" src={Poster_Link + film_details.poster_path} />
                        </Col>
                        <Col sm="10">
                            <CommentBox style={{ width: '100%' }} filmId={this.props.location.search.split(":")[1]}/>
                        </Col>
                    </Row>
                    {this.comments()}
                </Col>

            </Row>)
    }

    render() {

        return (
            <div>
                <NavigationBar />
                <Container fluid style={{ /*margin: 'auto',*/ margin: '3%', width: '94%', }}>
                    {this.state.film_details ? this.rendereds() : ""}

                </Container>
                <Footer />
            </div>

        );
    }
}


const styles = {
    columnStyle: {
        marginBottom: '5%',
        border: "2px solid #d6d7da",
        padding: '3%',
        paddingTop: 0,
        backgroundColor: "#f0f0f0",
        borderRadius: 5
    }
}
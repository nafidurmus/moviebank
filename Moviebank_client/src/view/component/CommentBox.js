import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import StarRating from '../component/StarRating';
import { sendComment, sendRate, getRate, getComments, deleteComment, deleteRate, updateComment, updateRate } from '../../controller/utils/UserApi';
export default class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.sendData = this.sendData.bind(this);
        this.saveDb = this.saveDb.bind(this);
        this.saveDbRate = this.saveDbRate.bind(this);
        this.saveDbComment = this.saveDbComment.bind(this);
        this.deleteRevRate = this.deleteRevRate.bind(this);
        this.updateRevRate = this.updateRevRate.bind(this);
        this.getData = this.getData.bind(this);
        this.state = { rating: "0", comment_title:"", comment_body:"", commentExist: null, rateId: null, commentId: null };
        this.giveRate = this.giveRate.bind(this);
        this.getData()
    }

    giveRate(newRating) {
        this.setState({
            rating: newRating
        });
    }

    saveDbRate(id){
        var rate = {
                rating_value: this.state.rating,
                user_id: id,
                rating_movie_id: this.props.filmId
            }
            sendRate(rate);
    }

    saveDbComment(id){
        var comment = {
            comment_title: this.state.comment_title,
            comment_body: this.state.comment_body,
            user_id: id,
            comment_movie_id: this.props.filmId
            }
            sendComment(comment)
    }

    saveDb(loginData){
            this.saveDbComment(loginData.id)
            this.saveDbRate(loginData.id)
    }

    async getData(){
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        if(loginData) {
            await getComments().then(response => {
                this.setState({ comments: response.data })
            })
            await getRate().then(response => {
                this.setState({ rates: response.data })
            })
            var currentFilmId = window.location.search.split(":")[1];
            if(this.state.comments.length != 0 || this.state.rates.length != 0) {
                var comments = this.state.comments;
                var rates = this.state.rates;
                let commentBool = false, rateBool = false;
                
                for(let i = 0; i < rates.length; i++){
                    if(rates[i].user_id == loginData.id && rates[i].rating_movie_id == currentFilmId) {
                        rateBool = true;
                        this.giveRate(rates[i].rating_value)
                        this.setState({ rateId: rates[i].id })
                        break;
                    } else { rateBool = false; }
                }
                for(let j = 0 ; j < comments.length; j++){
                    if(comments[j].user_id == loginData.id && comments[j].comment_movie_id == currentFilmId) {
                        commentBool = true;
                        this.setState({ comment_title: comments[j].comment_title, comment_body: comments[j].comment_body, commentId: comments[j].id })
                        //console.log("Zaten yorum yapılmış")
                        break;
                    }else {
                        commentBool = false;
                        //console.log("Yorum olur")
                    }
                }
                (rateBool && commentBool) ? this.setState({ commentExist: true }) : this.setState({ commentExist: false });
                return [rateBool, commentBool];
                
            } else { return [false, false]; } 
            }
    }

    sendData(){
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        if(loginData) {
            this.getData().then((response) => {
                var rateBool =  response[0], commentBool = response[1];
                // if((rateBool && commentBool) == false) {
                //     this.saveDb(loginData)
                // } else {
                    if(rateBool) { /*alert("You had already gave rate!")*/ }
                    else {
                        if(this.state.rating != (undefined || null || 0)){
                        this.saveDbRate(loginData.id)
                        rateBool = true;
                        } 
                    }
                    if(commentBool) { /*alert("You had already made comment!")*/ }
                    else{ 
                        if(this.state.comment_title && this.state.comment_body && rateBool){ 
                        this.saveDbComment(loginData.id); 
                        commentBool = true
                     }
                    } 
                    //console.log ("ratebool: " + rateBool + " yorum: " + commentBool)
                    return ((commentBool || rateBool) == true) ? window.location.reload(false) : ""
                    }
                );
            }
            else {
                return alert("You have to login before write a review.")
            }
        }

    deleteRevRate(){
        deleteComment(this.state.commentId)
        deleteRate(this.state.rateId)
        window.location.reload(false);
    }

    updateRevRate(){
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        var rate = {
                rating_value: this.state.rating,
                user_id: loginData.id,
                rating_movie_id: this.props.filmId
            }
        updateRate(rate, this.state.rateId);

        var comment = {
            comment_title: this.state.comment_title,
            comment_body: this.state.comment_body,
            user_id: loginData.id,
            comment_movie_id: this.props.filmId
            }
        updateComment(comment, this.state.commentId)
        window.location.reload(false);
    }

    render() {
        return (
            <Form style={{ border: "2px solid #b0b0b0", padding: 20, backgroundColor: "#d0d0d0", borderRadius: 10, }}>
                <FormGroup row>
                    <Label for="title" sm={2}><b>Title:</b></Label>
                    <Col sm={10}>
                        <Input type="text" name="title" id="title" placeholder="Write a title for your review." value={this.state.comment_title} onChange={ evt => this.setState({ comment_title: evt.target.value})} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Review" sm={2}><b>Review:</b></Label>
                    <Col sm={10}>
                        <Input type="textarea" name="Review" id="Review" placeholder="Write your review here." value={this.state.comment_body} onChange={ evt => this.setState({ comment_body: evt.target.value})}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="rate" sm={2}><b>Rate:</b></Label>
                    <Col sm={10}>
                        <Row style={{ marginLeft: '2%'}}>
                            <StarRating name="rate" sendRate={this.giveRate} rating={this.state.rating} collapse={false} />
                            <Badge color="info" pill style={{ marginLeft: 30, paddingTop: 7}}>{this.state.rating} / 10</Badge>
                        </Row>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        {this.state.commentExist ? 
                        <div>
                            <Button color="primary" style={{marginRight: 5}} onClick={this.updateRevRate}>Update</Button>
                            <Button color="danger" onClick={this.deleteRevRate}>Delete</Button>
                        </div> : <Button color="success" onClick={this.sendData}>Submit</Button>}
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}
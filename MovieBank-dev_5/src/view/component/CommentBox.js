import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import StarRating from '../component/StarRating';
import { sendComment, sendRate, getRate, getComments } from '../../controller/utils/UserApi';
export default class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.sendData = this.sendData.bind(this);
        this.saveDb = this.saveDb.bind(this);
        this.state = { rating: "0", comment_title:"", comment_body:"",  };
        this.giveRate = this.giveRate.bind(this);
    }

    giveRate(newRating) {
        this.setState({
            rating: newRating
        });
    }

    saveDb(loginData){
        var comment = {
            comment_title: this.state.comment_title,
            comment_body: this.state.comment_body,
            user_id: loginData.id,
            comment_movie_id: this.props.filmId
            }
            sendComment(comment)
            
            var rate = {
                rating_value: this.state.rating,
                user_id: loginData.id,
                rating_movie_id: this.props.filmId
            }
            sendRate(rate);
    }

    async sendData(){
        // getComments().then(response => {
        //     this.setState({ comments: response.data })
        // })

        // getComments().then(response => {
        //     this.setState({ rates: response.data })
        // })
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        if(loginData) {
            await getComments().then(response => {
                this.setState({ comments: response.data })
            })
            await getRate().then(response => {
                this.setState({ rates: response.data })
            })

            var currentFilmId = window.location.search.split(":")[1];
            (this.state.comments.length == 0) ? this.saveDb(loginData) : this.state.comments.map(comment => {
                if(comment.user_id == loginData.id && comment.comment_movie_id == currentFilmId) {
                    console.log("Yorum yapılmaz")
                }else {
                    this.saveDb(loginData)
                }
            })
        }
        
        
    }

    render() {
        return (
            <Form style={{ border: "2px solid #b0b0b0", padding: 20, backgroundColor: "#d0d0d0", borderRadius: 10, }}>
                <FormGroup row>
                    <Label for="title" sm={2}><b>Title:</b></Label>
                    <Col sm={10}>
                        <Input type="text" name="title" id="title" placeholder="Write a title for your review." onChange={ evt => this.setState({ comment_title: evt.target.value})} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Review" sm={2}><b>Review:</b></Label>
                    <Col sm={10}>
                        <Input type="textarea" name="Review" id="Review" placeholder="Write your review here." onChange={ evt => this.setState({ comment_body: evt.target.value})}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="rate" sm={2}><b>Rate:</b></Label>
                    <Col sm={10}>
                        <Row style={{ marginLeft: '2%'}}>
                            <StarRating name="rate" sendRate={this.giveRate} collapse={false} />
                            <Badge color="info" pill style={{ marginLeft: 30, paddingTop: 7}}>{this.state.rating} / 10</Badge>
                        </Row>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button onClick={this.sendData}>Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}
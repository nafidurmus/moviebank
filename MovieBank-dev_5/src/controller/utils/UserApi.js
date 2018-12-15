import React, {
    Component
} from 'react';
import axios from 'axios';

export function addNewUser(userData) {
    //   console.log(this.state.email + this.state.lastname + this.state.firstname + this.state.username + this.state.password + this.state.password_confirmation) 
    return axios({
            method: 'post',
            url: "http://localhost:3001/api/v1/users/",
            data: userData
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        })
}
/*axios.get("http://localhost:3001/api/v1/users/" )
    .then(response => {
      console.log(response)
    })
}*/

export function getComments() {
    return axios.get("http://localhost:3001/api/v1/comments/")
}
export function getRate() {
    return axios.get("http://localhost:3001/api/v1/ratings/")
}

export function sendComment(comment) {
    //console.log(comment)
    return axios({
            method: 'post',
            url: "http://localhost:3001/api/v1/comments",
            data: comment
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            //console.log(error.response)
        })
}
export function sendRate(rating) {
    return axios({
            method: 'post',
            url: "http://localhost:3001/api/v1/ratings",
            data: rating
        })
        .then(response => {
            //console.log(response)
        })
        .catch(error => {
            //console.log(error.response)
        })
}

export function login(user) {
    //console.log(user)
    return axios({
            method: 'post',
            url: "http://localhost:3001/api/v1/auth/login//",
            data: user
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        })
}
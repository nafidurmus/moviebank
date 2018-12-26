import React, {
    Component
} from 'react';
import axios from 'axios';

const domainName = "https://moviebank-api.herokuapp.com/"//"http://moviebank.herokuapp.com/"

export function addNewUser(userData) {
    //   console.log(this.state.email + this.state.lastname + this.state.firstname + this.state.username + this.state.password + this.state.password_confirmation) 
    return axios({
            method: 'post',
            url: domainName + "api/v1/users/",
            data: userData
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        })
}
/*axios.get(domainName + "api/v1/users/" )
    .then(response => {
      console.log(response)
    })
}*/

export function getUsers(){
    return axios({
        method: 'get',
        url: domainName + "api/v1/users/",
    })
}

export function updateUser(username, userData){
    return axios({
        method: 'put',
        url: domainName + "api/v1/users/" + username,
        data: userData
        })
        .then(response => {
            return console.log(response)
        })
        .catch(error => {
            return console.log(error.response)
        })
}

export function getComments() {
    return axios.get(domainName + "api/v1/comments/")
}
export function getRate() {
    return axios.get(domainName + "api/v1/ratings/")
}

export function sendComment(comment) {
    //console.log(comment)
    return axios({
            method: 'post',
            url: domainName + "api/v1/comments",
            data: comment
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            //console.log(error.response)
        })
}

export function deleteComment(id) {
    console.log(id)
    return axios({
            method: 'delete',
            url: domainName + "api/v1/comments/"+id
        })
        .then(response => {
            return console.log(response)
        })
        .catch(error => {
            return console.log(error.response)
        })
}

export function updateComment(comment, commentId) {
    //console.log(comment)
    return axios({
            method: 'put',
            url: domainName + "api/v1/comments/"+commentId,
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
            url: domainName + "api/v1/ratings",
            data: rating
        })
        .then(response => {
            //console.log(response)
        })
        .catch(error => {
            //console.log(error.response)
        })
}

export function deleteRate(id) {
    console.log(id)
    return axios({
            method: 'delete',
            url: domainName + "api/v1/ratings/"+id
        })
        .then(response => {
            return console.log(response)
        })
        .catch(error => {
            return console.log(error.response)
        })
}

export function updateRate(rate, rateId) {
    //console.log(rate)
    return axios({
            method: 'put',
            url: domainName + "api/v1/ratings/"+rateId,
            data: rate
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            //console.log(error.response)
        })
}

export function login(user) {
    //console.log(user)
    return axios({
            method: 'post',
            url: domainName + "api/v1/auth/login/",
            data: user
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response
        })
}

export function addWatchedList(userId, movieId) {
    //console.log(user)
    return axios({
            method: 'post',
            url: domainName + "api/v1/watchlists/",
            data: { user_id : userId, watchlist_movie_id: movieId }
        })
        .then(response => {
            return console.log(response)
        })
        .catch(error => {
            return console.log(error.response)
        })
}

export function getWatchedList(username) {
    //console.log(user)
    return axios({
            method: 'get',
            url: domainName + "api/v1/users/" + username,
        })
}

export function deleteFromWatchedList(id) {
    console.log(id)
    return axios({
            method: 'delete',
            url: domainName + "api/v1/watchlists/"+id
        })
        .then(response => {
            return console.log(response)
        })
        .catch(error => {
            return console.log(error.response)
        })
}



export function addWatchLaterList(userId, movieId) {
    //console.log(user)
    return axios({
            method: 'post',
            url: domainName + "api/v1/watchlaters/",
            data: { user_id : userId, watchlater_movie_id: movieId }
        })
        .then(response => {
            return console.log(response)
        })
        .catch(error => {
            return console.log(error.response)
        })
}

export function getWatchLaterList(username) {
    //console.log(user)
    return axios({
            method: 'get',
            url: domainName + "api/v1/users/" + username,
        })
}

export function deleteFromWatchLaterList(id) {
    //console.log(user)
    return axios({
            method: 'delete',
            url: domainName + "api/v1/watchlaters/"+id
        })
        .then(response => {
            return console.log(response)
        })
        .catch(error => {
            return console.log(error.response)
        })
}
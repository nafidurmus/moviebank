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

export function addWatchedList(userId, movieId) {
    //console.log(user)
    return axios({
            method: 'post',
            url: "http://localhost:3001/api/v1/watchlists/",
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
            url: "http://localhost:3001/api/v1/users/" + username,
        })
}

export function deleteFromWatchedList(id) {
    //console.log(user)
    return axios({
            method: 'delete',
            url: "http://localhost:3001/api/v1/watchlists/"+id
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
            url: "http://localhost:3001/api/v1/watchlaters/",
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
            url: "http://localhost:3001/api/v1/users/" + username,
        })
}

export function deleteFromWatchLaterList(id) {
    //console.log(user)
    return axios({
            method: 'delete',
            url: "http://localhost:3001/api/v1/watchlaters/"+id
        })
        .then(response => {
            return console.log(response)
        })
        .catch(error => {
            return console.log(error.response)
        })
}
import React, { Component } from 'react';
import axios from 'axios';


const API = 'https://api.themoviedb.org/3/';
const API_KEY = '?api_key=7852057188b7b21aa0bfa107beb405d2';

export const Youtube_Link = "https://www.youtube.com/embed/";
export const Poster_Link = "http://image.tmdb.org/t/p/w185/";



export function Fetch(DEFAULT_QUERY, query) {
    if (query == undefined) { query = "" };

    return axios.get(API + DEFAULT_QUERY + API_KEY + query)
        /*.then(results => {
            return results.json;
        });*/

}
import { Fetch } from '../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class SearchResultsStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { movieResults: "", personResults: "", tvResults: "" };
        this.listenToMany(actions);
        // actions.getFilmDetails.listen(this.getFilmDetails())
    }


    async getMultiResults(searchText) {
        const results = [];
        for (let i = 1; i < 6; i++) {
            await Fetch('search/multi', "&page=" + i + "&query=" + searchText).then(function (response) {
                results.push(response.data.results);
            }.bind(this))
        }
        var merged = [].concat.apply([], results);
        this.divideContent(merged);
        //await this.setState({ searchResults: merged });
    }

    //Bu fonksiyon sadece multiResultstan gelen verileri ayrıştırmaya yarar.
    async divideContent(content) {
        var movies = [], people = [], tv = [];
        content.map(data => {
            if (data.media_type == "movie") {
                movies.push(data);
            } else if(data.media_type == "person"){
                people.push(data);
            } else if(data.media_type == "tv"){
                tv.push(data);
            }
        })
        movies = [].concat.apply([], movies);
        people = [].concat.apply([], people);
        tv = [].concat.apply([], tv);
        await this.setState({ movieResults: movies, personResults: people, tvResults: tv});
    }

    async getMovieResults(searchText) {
        const results = [];
        for (let i = 1; i < 6; i++) {
            await Fetch('search/movie', "&page=" + i + "&query=" + searchText).then(function (response) {
                results.push(response.data.results);
            }.bind(this))
        }
        var merged = [].concat.apply([], results);
        await this.setState({ movieResults: merged });
    }

    async getPersonResults(searchText) {
        const results = [];
        for (let i = 1; i < 6; i++) {
            await Fetch('search/person', "&page=" + i + "&query=" + searchText).then(function (response) {
                results.push(response.data.results);
            }.bind(this))
        }
        var merged = [].concat.apply([], results);
        await this.setState({ personResults: merged });
    }
    async getTvResults(searchText) {
        const results = [];
        for (let i = 1; i < 6; i++) {
            await Fetch('search/tv', "&page=" + i + "&query=" + searchText).then(function (response) {
                results.push(response.data.results);
            }.bind(this))
        }
        var merged = [].concat.apply([], results);
        await this.setState({ tvResults: merged });
    }
}

var store = Reflux.initStore(SearchResultsStore);


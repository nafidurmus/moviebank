import { Fetch } from './../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class FilmDetailsStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { film_details: null, videos: null, credits: null, filmDetailsForLists: null };
        this.listenToMany(actions);
        // actions.getFilmDetails.listen(this.getFilmDetails())
    }

    async getFilmDetailsForLists(movieIdArray){
        const results = [];
        for(let i = 0; i < movieIdArray.length; i++){
            await Fetch('movie/' + movieIdArray[i]).then(function (response) {
                //console.log(response.data)
                results.push(response.data);
            }.bind(this))
        }
        await this.setState({filmDetailsForLists: results});
    }

    getFilmDetails(id) {
        Fetch('movie/'+ id).then(function (response) {
            const film_details = response.data;
            this.setState({ film_details });
        }.bind(this))
        // console.log(this.state.playing + "psa")
    }

    getFilmCredits(id) {
        Fetch('movie/' + id + '/credits').then(function (response) {
            const credits = response.data;
            this.setState({ credits });
        }.bind(this))
        // console.log(this.state.playing + "psa")
    }

    getVideos(id){
        Fetch('movie/' + id + '/videos').then(function (response) {
            const videos = response.data.results;
            this.setState({ videos });
        }.bind(this))
        // console.log(this.state.videos)
    }
}

var store = Reflux.initStore(FilmDetailsStore);


import { Fetch } from './../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class CelebsStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { celebs: null, celebDetails: null, personMovieCredits: null };
        this.listenToMany(actions);
        actions.getCelebs.listen(this.getCelebs())
    }


    async getCelebs() {
        const results = [];
        for (let i = 1; i < 6; i++) {
            await Fetch('person/popular', "&page=" + i).then(function (response) {
                results.push(response.data.results);
                //console.log(response);
            }.bind(this))
        }
        var merged = [].concat.apply([], results);
        await this.setState({ celebs: merged });
    }

    async getPersonMovieCredits(id) {
        const results = [];
        for (let i = 1; i < 6; i++) {
            await Fetch('person/' + id + "/movie_credits", "&page=" + i).then(function (response) {
                results.push(response.data);
                //console.log(response.data);
            }.bind(this))
        }
        var merged = [].concat.apply([], results);
        await this.setState({ personMovieCredits: merged });
    }

    getCelebDetails(id) {
        Fetch('person/' + id).then(function (response) {
            const celebDetails = response.data;
            this.setState({ celebDetails });
        }.bind(this))
        // console.log(this.state.playing + "psa")
    }
}


var store = Reflux.initStore(CelebsStore);
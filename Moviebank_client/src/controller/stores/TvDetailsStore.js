import { Fetch } from './../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class TvDetailsStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { tv_details: null, credits: null };
        this.listenToMany(actions);
        // actions.getFilmDetails.listen(this.getFilmDetails())
    }


    getShowDetails(id) {
        Fetch('tv/' + id).then(function (response) {
            const tv_details = response.data;
            this.setState({ tv_details });
        }.bind(this))
        // console.log(this.state.playing + "psa")
    }

    getShowCredits(id) {
        Fetch('tv/' + id + '/credits').then(function (response) {
            const credits = response.data;
            this.setState({ credits });
        }.bind(this))
        // console.log(this.state.playing + "psa")
    }
}

var store = Reflux.initStore(TvDetailsStore);


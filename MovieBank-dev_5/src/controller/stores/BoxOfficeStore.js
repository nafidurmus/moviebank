import { Fetch } from './../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class BoxOfficeStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { boxOffice: null };
        // this.listenToMany(actions);
        actions.getBoxOffice.listen(this.getBoxOffice())
    }


    getBoxOffice() {
        Fetch('movie/now_playing').then(function (response) {
            const boxOffice = response.data.results;
            this.setState({ boxOffice });
        }.bind(this))
        // console.log(this.state.boxOffice + "psa")
    }
}


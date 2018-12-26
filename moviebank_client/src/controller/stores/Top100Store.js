import { Fetch } from './../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class Top100store extends Reflux.Store {

    constructor() {
        super();
        this.state = {top100 : null};
        // this.listenToMany(actions);
        actions.getTop100.listen(this.getTop100())
    }

     async getTop100(){
        const results = [];
        for(let i = 1; i < 6; i++){
            await Fetch('movie/top_rated', "&page="+i).then(function (response) {
                // console.log(response)
                results.push(response.data.results);
            }.bind(this))
        }
        
        var merged = [].concat.apply([], results);
        await this.setState({top100: merged});
        
        // Fetch('trending/movie/week', "&page=").then(function (response) {
        //     this.setState({playing : response.data.results});
        // }.bind(this))
        // console.log(this.state.playing + "psa")
    }
}

var store = Reflux.initStore(Top100store);
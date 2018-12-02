import {Fetch} from './../utils/Api';
import Reflux from 'reflux';
import {actions} from '../../actions';

export class PlayingStore extends Reflux.Store{

    constructor() {
        super();
        this.state = {playing : null};
        // this.listenToMany(actions);
        actions.getPlayings.listen(this.getPlayings())
    }
    

    async getPlayings(){
        const results = [];
        for(let i = 1; i < 6; i++){
            await Fetch('trending/movie/week', "&page="+i).then(function (response) {
                results.push(response.data.results);
            }.bind(this))
        }
        
        var merged = [].concat.apply([], results);
        await this.setState({playing: merged});
        
        // Fetch('trending/movie/week', "&page=").then(function (response) {
        //     this.setState({playing : response.data.results});
        // }.bind(this))
        // console.log(this.state.playing + "psa")
    }
}

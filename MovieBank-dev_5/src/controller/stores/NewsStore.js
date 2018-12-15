import { Fetch } from './../utils/Api';
import Reflux from 'reflux';
import { actions } from '../../actions';

export class NewsStore extends Reflux.Store {

    constructor() {
        super();
        this.state = { news: null };
        // this.listenToMany(actions);
        actions.getNews.listen(this.getNews())
    }


    async getNews() {
        const results = [];
        for (let i = 1; i < 6; i++) {
            await Fetch('movie/upcoming', "&page=" + i).then(function (response) {
                results.push(response.data.results);
            }.bind(this))
        }

        var merged = [].concat.apply([], results);
        await this.setState({ news: merged });

        // Fetch('movie/upcoming').then(function (response) {
        //     this.setState({ news: response.data.results });
        // }.bind(this))
        // console.log(this.state.playing + "psa")
    }
}

import Reflux from 'reflux';

export var actions = Reflux.createActions([
    'getCelebs',
    'getNews',
    'getPlayings',
    'getCelebDetails',
    'getFilmDetails',
    'getFilmCredits',
    'getVideos',
    'getBoxOffice',
    'getTop100',
    'getMultiResults',
    'getMovieResults',
    'getPersonResults',
    'getTvResults',
    'getShowDetails',
    'getShowCredits',
    'getFilmDetailsForLists',
    'getPersonMovieCredits'
]);

actions.getPlayings();
actions.getNews();
actions.getCelebs();
actions.getCelebDetails();
actions.getFilmDetails();
actions.getFilmCredits();
actions.getVideos();
actions.getBoxOffice();
actions.getTop100();
actions.getMultiResults();
actions.getMovieResults();
actions.getPersonResults();
actions.getTvResults();
actions.getShowDetails();
actions.getShowCredits();
actions.getFilmDetailsForLists();
actions.getPersonMovieCredits();
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
]);

actions.getPlayings();
actions.getNews();
actions.getCelebs();
actions.getCelebDetails();
actions.getFilmDetails();
actions.getFilmCredits();
actions.getVideos();
actions.getBoxOffice();
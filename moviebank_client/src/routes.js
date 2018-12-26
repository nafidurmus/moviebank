import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import film_details from './view/pages/DetailsFilm';
import celeb_details from './view/pages/DetailsCeleb';
import DetailsTvShow from './view/pages/DetailsTvShow';
import SignUp from './view/pages/SignUp';
import App from './App';
import Trends from './view/pages/Trends';
import Upcoming from './view/pages/Upcoming';
import PopularCelebs from './view/pages/PopularCelebs';
import SearchResults from './view/pages/SearchResults';
import CommentPage from './view/pages/CommentPage';
import DetailsProfile from './view/pages/DetailsProfile';
import Top100 from './view/pages/Top100';
import WatchedList from './view/pages/WatchedList';
import WatchLater from './view/pages/WatchLater';
import ForgotPassword from './view/pages/ForgotPassword';
import TwoFAAuthPage from './view/pages/2FAAuthPage';
import CompleteSignup from './view/pages/CompleteSignUp';
import Conditions from './view/pages/Conditions';
import ChangePassword from './view/pages/ChangePassword';


const ReactRouter = () => {

    return (
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/film-detail" component={film_details} />
                <Route path="/celeb-detail" component={celeb_details} />
                <Route path="/tv-show-detail" component={DetailsTvShow} />
                <Route path="/signup" component={SignUp} />
                <Route path="/trends" component={Trends} />
                <Route path="/upcoming" component={Upcoming} />
                <Route path="/popular-celebs" component={PopularCelebs} />
                <Route path="/search-results" component={SearchResults}/>
                <Route path="/comment-page" component={CommentPage} />
                <Route path="/profile-details" component={DetailsProfile} />
                <Route path="/top100" component={Top100} />
                <Route path="/watched-list" component={WatchedList} />
                <Route path="/watch-later" component={WatchLater} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/verify-account" component={TwoFAAuthPage} />
                <Route path="/complete-signup" component={CompleteSignup} />
                <Route path="/conditions" component={Conditions} />
                <Route path="/change-password" component={ChangePassword} />
            </div>
        </Router>
    );
}


export default ReactRouter;
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'


import ScreenHome from './containers/ScreenHome';
import ScreenArticlesBySource from './containers/ScreenArticlesBySource';
import ScreenMyArticles from './containers/ScreenMyArticles';
import ScreenSource from './containers/ScreenSource';

import articleWishList from './reducers/likeArticle'
import token from './reducers/setToken'
import countryAPI from './reducers/changeLanguage'

const store = createStore(combineReducers({articleWishList, token, countryAPI}))


function App() {
  return (
    <Provider store = {store}>
      <Router>
        <Switch>
          <Route path = '/' exact component = {ScreenHome} />
          <Route path = '/screenarticlesbysource/:id' component = {ScreenArticlesBySource} />
          <Route path = '/screenmyarticles' component = {ScreenMyArticles} />
          <Route path = '/screensource' component = {ScreenSource} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

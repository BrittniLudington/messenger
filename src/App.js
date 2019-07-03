import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import loginsignup from './components/loginsignup';
import userPage from './components/userpage';
import SearchResults from './components/search';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
      <Redirect exact from='/' to='/login'></Redirect>
      <Route path='/login' component={loginsignup}></Route>
      <Route path="/user/MyPage" component={userPage}></Route>
      <Route path="/search/:username" component={SearchResults}></Route>
      <Route path="/search/" component={SearchResults}></Route>
      </Switch>
    </div>
  );
}

export default App;

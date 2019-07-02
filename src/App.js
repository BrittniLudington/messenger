import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import loginsignup from './components/loginsignup';
import userPage from './components/userpage';
import SearchResults from './components/search';
import Navbar from './components/navbar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
      <Redirect exact from='/' to='/login'></Redirect>
      <Route path='/login' component={loginsignup}></Route>
      <Route path="/user/MyPage" component={userPage}></Route>
      <Route path="/search/:username" component={SearchResults}></Route>
      </Switch>
    </div>
  );
}

export default App;

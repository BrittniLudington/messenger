import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import loginsignup from './components/loginsignup';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path='/login' component={loginsignup}></Route>
      </Switch>
    </div>
  );
}

export default App;

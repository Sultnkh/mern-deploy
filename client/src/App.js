import './App.css';
import New from './components/New'
import List from './components/List';
import View from './components/View';
import Reg from './views/Reg';
import Login from './views/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserSession from './contexts/session'
import { useState } from 'react';

function App() {
  const [user,setUser]=useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <UserSession.Provider value={{user,setUser}}>
      <Switch>
        <Route path='/pirates/:id'>
          <View/>
        </Route>
      <Route path='/pirates'>
      <List/>
      </Route>
      <Route path='/new'>
        <New/>
      </Route>
      <Route path='/login'>
      <Login/>
      </Route>
      <Route path='/'>
        <Reg/>
      </Route>
      </Switch>
      </UserSession.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

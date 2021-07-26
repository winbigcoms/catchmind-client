import React from 'react';
import LoginPage from './pages/login'
import {RecoilRoot} from 'recoil';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import SignUp from './pages/signUp';
import CatchMind from './pages/catchmind';

const App:React.FC =()=>{
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter> 
          <Switch>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/SignUp" exact component={SignUp}/>
            <Route path="/game" exact component={CatchMind}/>
          </Switch>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;

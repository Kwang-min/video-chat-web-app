import React, { Suspense }  from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from './views/LandingPage/LandingPage'
import Footer from './views/Footer/Footer'
import NavBar from './views/NavBar/NavBar'

function App() {
  return (

    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        
        <Switch>
            <Route exact path="/" component={LandingPage} />
        </Switch>
          
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;



import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MainView from './components/MainView';
import AOS from 'aos';
import { isMobile } from 'react-device-detect';

import 'aos/dist/aos.css';
import './fonts.css';
import './tailwind.css';

function App() {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        offset: isMobile ? 10 : 100,
      });
      AOS.refresh();
    }, 1500);
  }, []);

  return (
    <Router basename={process.env.BASE_PATH}>
      <Switch>
        <Route exact path="/">
          <div>
            pxCode Screen List: <br />
            <Link to="/MainView">MainView</Link>
          </div>
        </Route>

        <Route exact path="/MainView" component={MainView} />
      </Switch>
    </Router>
  );
}

export default App;

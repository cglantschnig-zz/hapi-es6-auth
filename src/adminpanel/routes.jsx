import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './components/App';
import Test from './components/Test';
import Page404 from './components/Page404';

export default function(history) {
  return (
    <Router history={history}>
      <Route component={App} >
        <Route path="/" component={Test} />
      </Route>
    </Router>
  );
}

/**
 * Routes which render all the admin panel urls
 */
import React from 'react';
import { renderToString } from 'react-dom/server';

import { match, RouterContext, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from '../../adminpanel/routes';
import configureStore from '../../adminpanel/utils/configureStore';

import Page404 from '../../adminpanel/components/Page404';

const handleRender = (renderProps) => {
  const store = configureStore();

  const initialView = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  const html = renderToString(<RouterContext {...renderProps} />);

  return renderFullPage(html, store.getState());
}

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Adminpanel</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
};

var routes = [
  {
    method: 'GET',
    path: '/admin/{path*}',
    handler: function(request, reply) {
      let location = '/' + (request.params.path || '');
      let routes = getRoutes(createMemoryHistory());

      // Note that req.url here should be the full URL path from
      // the original request, including the query string.
      match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (error) {
          reply(error.message);
        } else if (redirectLocation) {
          reply.redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          reply(handleRender(renderProps));
        } else {
          reply(renderToString(<Page404 />)).code(404);
        }
      })
    }
  }
];

export default routes;

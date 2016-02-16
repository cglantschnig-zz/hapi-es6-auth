/**
 * Routes which render all the admin panel urls
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import cmsRoutes from '../../adminpanel/routes';

var routes = [
  {
    method: 'GET',
    path: '/admin/{path*}',
    handler: function(request, reply) {
      let pathUrl = '/' + (request.params.path || '');
      // Note that req.url here should be the full URL path from
      // the original request, including the query string.
      match({ routes: cmsRoutes, location: pathUrl }, (error, redirectLocation, renderProps) => {
        if (error) {
          reply(error.message);
        } else if (redirectLocation) {
          reply.redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          reply(renderToString(<RouterContext {...renderProps} />));
        } else {
          reply('Not found');
        }
      })
    }
  }
];

export default routes;

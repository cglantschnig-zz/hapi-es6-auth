/**
 * Routes which render all the admin panel urls
 */
import { readFile } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';
import promisify from 'es6-promisify';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import hist from 'history';
import adminRoutes from '../../adminpanel/routes';
import server from '../api';

const readFileAsync = promisify(readFile);
const viewPath = join(__dirname, '../views/index.html');

let content = null;

var routes = [
  {
    method: 'GET',
    path: '/admin/{path*}',
    handler: function(request, reply) {
      console.log(hist);
      const location = hist.createLocation(request.params.path || '/');
      match({
        routes: adminRoutes,
        location: location,
      }, (err, redirectLocation, renderProps) => {
        if (redirectLocation) {
          res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (err) {
          console.log(err);
          // send error
        } else if (renderProps === null) {
          // send 404
        } else {
          console.log(renderProps);
          let componentString = ReactDOMServer.renderToString(adminRoutes.component);
          let template = Handlebars.compile(content);
          let result = template({
            content: componentString,
            title: 'Hapi-Auth-Es6'
          });
          reply(result);
        }
      });

    }
  }
];

export default readFileAsync(viewPath, 'utf8')
  .then((_content) => {
    content = _content;
    server.log('info', 'Loaded template for server side rendering');
    return routes;
  });

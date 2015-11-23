/**
 * Routes which render all the admin panel urls
 */
import { readFile } from 'fs';
import { join } from 'path';
import promisify from 'es6-promisify';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import adminRoutes from '../../adminpanel/routes';
import Handlebars from 'handlebars';

const readFileAsync = promisify(readFile);

var routes = [
  {
    method: 'GET',
    path: '/admin/',
    handler: function(request, reply) {
      let filepath = join(__dirname, '../views/index.html');
      let promise =  readFileAsync(filepath, 'utf8')
        .then((content) => {
          let componentString = ReactDOMServer.renderToString(adminRoutes.component);
          let template = Handlebars.compile(content);
          return template({
            content: componentString,
            title: 'Hapi-Auth-Es6'
          });
        });
      reply(promise);
    }
  }
];

export default routes;

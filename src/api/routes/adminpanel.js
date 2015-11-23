/**
 * Routes which render all the admin panel urls
 */
import { readFile } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';
import promisify from 'es6-promisify';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import adminRoutes from '../../adminpanel/routes';
import server from '../api';

const readFileAsync = promisify(readFile);
const viewPath = join(__dirname, '../views/index.html');

let content = null;

var routes = [
  {
    method: 'GET',
    path: '/admin/',
    handler: function(request, reply) {
      let componentString = ReactDOMServer.renderToString(adminRoutes.component);
      let template = Handlebars.compile(content);
      let result = template({
        content: componentString,
        title: 'Hapi-Auth-Es6'
      });
      reply(result);
    }
  }
];

export default readFileAsync(viewPath, 'utf8')
  .then((_content) => {
    content = _content;
    server.log('info', 'Loaded template for server side rendering');
    return routes;
  });

const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const { graphQLSchema } = require('./server/graphAPI');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3000;

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(cookieParser());

  server.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
      schema: graphQLSchema,
    })
  );

  server.use('/graphiql', graphiqlExpress({
    // schema: graphQLSchema,
    endpointURL: '/graphql',
  }));

  // handles server side rendering
  server.get('*', (req, res) => {
    return handle(req, res);
  });


  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });

});
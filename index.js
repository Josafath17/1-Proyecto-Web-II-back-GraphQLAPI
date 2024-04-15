const jwt = require("jsonwebtoken");

// Configurar el servidor Express
const express = require("express");
const app = express();

// Configurar de GraphQL
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const account = require("./Resolvers/account");
const user = require("./Resolvers/user");
const playlist = require("./Resolvers/playlist");
const video = require("./Resolvers/Video");

// Unir tipos GraphQL
const schema = buildSchema(`
    type Account {
      id: ID!
      firstName: String!
      pin: Int!
      age: Int!
      avatar: String!
      playlists: [String]!
      user: ID!
    }
    type Playlist {
      id: ID!
      name: String!
      user: ID!
    }
    type User {
      id: ID!
      username: String!
      password: String!
      phone: String!
      firstName: String!
      lastName: String!
      country: String!
      birthdate: String!
    }
    type Video {
      id: ID!
      name: String!
      url: String!
      description: String!
    }
    type Query {
      getAccount(id: ID!): Account
      getAccounts: [Account!]!

      getUser(id: ID!): User
      getUsers: [User!]!

      getPlaylist(id: ID!): Playlist
      getPlaylists: [Playlist!]!
      
      getVideo(id: ID!): Video
      getVideos: [Video!]!

    }
`);

const root = {
  ...account,
  ...user,
  ...playlist,
  ...video,
};

// Conexión a la base de datos MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/users2");

const theSecretKey = process.env.JWT_SECRET;

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
const cors = require("cors");
const videoModel = require("./models/videoModel");

// Middlewares
app.use(bodyParser.json());
// check for cors
app.use(
  cors({
    domains: "*",
    methods: "*",
  })
);

// JWT Authentication middleware
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    const authToken = req.headers["authorization"].split(" ")[1];
    try {
      jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
        if (err || !decodedToken) {
          res.status(401);
          res.send({
            error: "Unauthorized",
          });
          return;
        }
        next();
      });
    } catch (e) {
      console.error("There was an error", e);
      res
        .send({
          error: "Unauthorized ",
        })
        .status(401);
    }
  } else {
    res.status(401);
    res.send({
      error: "Unauthorized ",
    });
  }
});

// Crear y utilizar el middleware GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

// Iniciar el servidor
app.listen(3001, () => console.log(`Example app listening on port 3001!`));

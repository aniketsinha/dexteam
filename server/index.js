const express = require("express");
const api = require("./api");

const app = express();
const PORT = process.env.PORT || 1337;
var db = require('./db')
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');


db.connect(db.MODE_PRODUCTION, function () {
    console.log("app.js: DB connected")
});

app
  .use(express.static(`${__dirname}/../public`))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/api", api)
  .use('/users', usersRouter)
  .use('/items', itemsRouter)
  .listen(PORT, () => console.log(`Server listening on ${PORT}`));

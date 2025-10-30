const express = require('express');
const app = express();

const path = require('node:path');
const inventoryRouter = require('./routes/inventoryRouter');

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");  

app.use("/", inventoryRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
    console.log('Listening on port ' + PORT);
});
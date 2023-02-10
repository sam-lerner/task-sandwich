const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

let cors = require("cors");
app.use(cors());


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
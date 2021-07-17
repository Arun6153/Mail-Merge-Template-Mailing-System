const express = require('express');
const app = express();
const path = require('path');
const local_evn = require('./env/enviornment_variables');
const port = local_evn["port"];
const routes = require('./routes/routes');

app.use('', routes);

app.use("/files", express.static(path.join(__dirname, "view")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express');
const app = express();
const local_evn = require('./env/enviornment_variables');
const port = local_evn["port"];
const routes = require('./routes/routes');

app.use('', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
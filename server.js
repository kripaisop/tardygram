require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

app.listen(7898, () => {
  console.log('listening on port 7898');
});

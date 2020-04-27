const path = require('path');
const app = require('express')();

app.get('*', (req, res) => {
  let { originalUrl: resource } = req;

  if (resource === '/') {
    resource = '/index.html';
  }

  res.sendFile(path.resolve(`./demo/${resource}`));
});

app.listen(1234, () => {
  console.log('http://localhost:1234');
});
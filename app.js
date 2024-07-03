const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/name', (req, res) => {
  res.send('Hello, Chameera!');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
}

module.exports = app;

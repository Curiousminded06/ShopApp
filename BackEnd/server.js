const express = require('express');
const app = express();
const port = 8000;
const shops = require('./routes/shops');

app.use(express.json());
app.use('/api/shops', shops);

app.get('/', (req, res) => {
    res.send('Welcome to ShopApp!');
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

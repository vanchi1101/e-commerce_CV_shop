const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routerWebsite = require('./routers/routerWebsite');

const app = express();

app.use(cors({
  origin: 'https://cv-shop.onrender.com'
}));
app.use(bodyParser.json());
app.use('/api/users', routerWebsite);

app.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
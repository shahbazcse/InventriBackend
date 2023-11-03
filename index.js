require('./db/db.connection');

const express = require('express');
const app = express();
app.use(express.json());

const itemsRouter = require('./routes/items.router');
const salesRouter = require('./routes/sales.router');

const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:3000', 'https://inventri.vercel.app'],
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello, Express!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Mounting /items router
app.use('/items', itemsRouter);

// Mounting /sales router
app.use('/sales', salesRouter);
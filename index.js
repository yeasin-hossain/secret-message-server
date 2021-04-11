const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./DB/DbConnection');
const messageRouter = require('./routes/messageRoutes');

dbConnection();
app.use(cors());
app.use(express.json());

app.use('/message', messageRouter);

app.listen(5000, () => console.log('Express on'));

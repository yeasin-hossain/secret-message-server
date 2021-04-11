const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./DB/DbConnection');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');

dbConnection();
app.use(cors());
app.use(express.json());

app.use('/message', messageRoutes);
app.use('/user', userRoutes);

app.listen(5000, () => console.log('Express on'));

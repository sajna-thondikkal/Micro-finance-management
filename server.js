const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const { connected } = require('process');
require('dotenv').config();
const roleRoutes = require('./routes/roles');
const userRoutes = require('./routes/users');
const depositeRoutes = require('./routes/deposites');
const withdrawalRoutes = require('./routes/withdrawals');
const loanRoutes = require('./routes/loans');


const PORT = process.env.PORT || 3000;
const DB_CONN_STR = process.env.DATABASE_URL;

const app = express();
mongoose.connect(DB_CONN_STR);
const database = mongoose.connection;
database.on('error',(error)=>{
    console.log("DB error",error);
});
database.once('connected',()=>{
    console.log("DB connected successfully");
});

const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/api/v1/roles',roleRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/deposites',depositeRoutes);
app.use('/api/v1/withdrawals',withdrawalRoutes);
app.use('/api/v1/loans',loanRoutes);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(PORT,"Server is listening on port");
})
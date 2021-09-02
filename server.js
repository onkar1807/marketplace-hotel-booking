require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { readdirSync } = require('fs');

// database connection
const url = process.env.MONGO_URI
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected');
}).catch(err => {
    console.log(err);
})

// middlewares
app.use(express.json());
app.use(cors());

// route middleware
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));


// heroku
if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))
}

// listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
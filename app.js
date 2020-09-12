//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./project-files/routes/routes');

//define a port number

// const port = 3000;

const serverUrl = "https://android-course.herokuapp.com/";
//connect to mongoDb
const uri = "mongodb+srv://Zuhayr:i5tk4EIMGKfy8w0j@cluster0.aiobn.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });

//mongodb for internet usage

// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb');
});

//on error 
mongoose.connection.on('error', (err) => {
    if(err){
        console.log('Connected to database mongodb');
    }
});

//adding middleware

app.use(cors());
app.use(bodyparser.json());

app.use(express.urlencoded());

//route will become localhost/api/'contact' etc
app.use('/api/', route);


//testing server 
app.get('/', (req, res) => {
    res.send('foobar');
})
// app.listen(port,() => {
//     console.log('Server started at port' + port);
// });

.listen(process.env.PORT || 5000)
//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var multer = require('multer');

const login_signup_routes = require('./routes/login_signup_routes.js');

var app = express();

const route = require('./project-files/routes/routes');

const serverUrl = "https://ekansh-app-backend.herokuapp.com/";
//connect to mongoDb
const uri = "mongodb+srv://Zuhayr:i5tk4EIMGKfy8w0j@cluster0.aiobn.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb');
});

//on error 
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Connected to database mongodb');
    }
});

//adding middleware

app.use(cors());
app.use(bodyparser.json());

app.use(express.urlencoded());

//route will become localhost/api/'contact' etc
app.use('/api/', route);

app.use('/api/signup', login_signup_routes);


//testing server 
app.get('/', (req, res) => {
    res.send('foobar');
})

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads')
    },

    filename: (req, file, callback) => {
        var time = Date.now()
        callback(null, time + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

app.post('/file', upload.single('userPdf'), (req, res, next) => {
    console.log("The upload function was called with a file")

    try {
        var file = req.file;

        console.log(file)
        var path = serverUrl + "file?file_name=" + file.filename
        var photoRes = ({ url: path, photo_details: file })

        res.send({ photoRes, status: 'success' })
    } catch (error) {
        console.log(error);
        res.sendStatus(400).json({ msg: 'Unable to add pdf at this time, please try again later', photoRes, status: 'Failure' });
    }
});

app.get("/file", (req, res) => {
    var image_name = req.param('file_name');
    res.sendFile(path.join(__dirname, "./uploads/" + image_name));
})

    .listen(process.env.PORT || 5000)
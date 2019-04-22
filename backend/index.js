if (process.env.NODE_EV !== 'production') {
     require('dotenv').config();

}


const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
// inicializar

const app = express();
require('./database');

//setting
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/upload'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
});

app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routers

app.use('/api/books', require('./routes/books'));

/// static files 
app.use(express.static(path.join(__dirname, 'public')));



app.listen(app.get('port'), () => {
    console.log('Server en port  ', app.get('port'));
});
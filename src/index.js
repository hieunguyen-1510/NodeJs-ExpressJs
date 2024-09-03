const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const db = require('./config/db');

// Connect to DB
db.connect().catch(error => {
    console.error('Database connection failed:', error);
    process.exit(1); 
});

const app = express();

const port = 3000;

const route = require('./routes');


app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(morgan('combined'));

app.use(methodOverride('_method'));

//Template engine Handlebars
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Khởi tạo các route
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

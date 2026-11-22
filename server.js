import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';
import session  from 'express-session';
import flash from './src/middleware/flash.js';

const NODE_ENV = process.env.NODE_ENV?.toLocaleLowerCase() || 'production';
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();

/**
  * Configure Express middleware
  */

// Allow Express to receive and process common POST data

app.use(session({ 
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // Session expires after 1 hour of inactivity,
}));

app.use(flash);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');


// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

app.use((req, res, next) =>
{
    res.locals.NODE_ENV = NODE_ENV;

    next();
})


/**
  * Routes
  */

 app.use(router);


app.use((req, res, next) =>
{
    // console.log('This got executed before running the error middleware')
    const err = new Error('Page not found');
    err.status = 404;

    next(err);

});

app.use((err, req, res, next) =>
{
    console.error('Error occured:', err.message);
    console.error('Stack Trace:', err.stack);

    const status = err.status || 500;
    const template = err.status === 404? '404' : '500';


    const context =
    {
        title: status === 404? 'Page not found' : 'Server Error',
        error: err.message,
        stack: err.stack

    }

    res.render(`errors/${template}`, context);

});

app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http:// 127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);

    }

    catch(error)
    {
        console.error('Error connecting to the database', error);
    }
    
});

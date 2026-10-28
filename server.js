import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV?.toLocaleLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');



/**
  * Routes
  */
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', {title});
})

app.get('/organizations', async (req, res) => {
    const title = 'Our Partner Organizations';
    res.render('organizations', {title});
});

app.get('/projects', (req, res) => {
    const title = 'Service Projects';
    res.render('projects', {title})
});

app.listen(PORT, () => {
    console.log(`Server is running at http:// 127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
})
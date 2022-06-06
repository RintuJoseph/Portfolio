const express = require('express');
const data = require('./data.json');
const projects = data.projects;
const app = express();
// const port = process.env.PORT || 3000;

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

// render home page
app.get('/', (req, res) => {
    res.render('index', { projects });
});

// render about page
app.get('/about', (req, res) => {
    res.render('about');
});

// render individual project pages
app.get('/projects/:id', (req, res) => {
    const id = req.params.id;
    const project = projects[id];
    res.render('project', { project });
});

// test for global errors

// app.use((req,res,next) => {
//     console.log('hello');
//     const err = new Error('oh no!');
//     err.status = 500;
//     next(err); 
// });

// 404 errors
app.use((req, res, next) => {
    const err = new Error();
    err.message = 'Page Not Found';
    err.status = 404;
    // console.log(`Error ${err.status}: ${err.message}`);
    res.render('page-not-found', { err });
    next();
});
  
app.use((err, req, res, next) => {
    res.locals.error = err;
    console.log(err.status);
    if (err.status === undefined) {
        err.status = 404;
        err.message = 'Page Not Found';
        // console.log(`Error ${err.status}: ${err.message}`);
        res.render('page-not-found', { err });
    } else {
        res.status(err.status || 500);
        console.log(`Error ${err.status}: ${err.message}`);
        res.render('error', { err });
    }
  });

// app.listen(3000, () => {
//     console.log('The application is running on localhost:3000!')
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

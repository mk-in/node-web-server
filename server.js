const express = require('express'); // express framework
const hbs = require('hbs');         // handlebars
const fs = require ('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');    // partial views for recurring HTML code
app.set('view engine','hbs');                           // config


app.use((req, res, next) => {                           // (1) middleware for logging
    const now = new Date().toString();
    const log = `${now} : ${req.method} ${req.url} \n`;

    fs.appendFile('server.log', log, (error) => {
        if (error) {
            console.log('Unable to write to log file');
        };
    });
    next();
});

app.use((req, res, next) => {                           // 2) middleware for maintenance 
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page'
    });
})

app.use(express.static(__dirname + '/public'));         // 3) middleware for static pages folder
                                                        // good design keeps log first, then maintenance (if needed), then static ,then dynamic content




hbs.registerHelper('getCurrentYear', () => {            // kind of runtime function
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});





app.get('/', (request, response) => {                   // for root path
    // response.send({
    //     name: 'User',
    //     Likes: [
    //         'Node',
    //         'SAP',
    //         'Python'
    //     ]
    // });

    response.render('home.hbs', {                       // render a view
        pageTitle: 'Home page',
        welcomeMessage: "Welcome to my website. You are in year"
    })
});

app.get('/about', (request, response) => {              // fot about page
    // response.send('Hello');
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (request, response) => {                
    response.send({
        errorMessage: 'This is a bad request'
    })
})
app.listen(3000, () => {                                // start server
    console.log('Server is up on port 3000');
});
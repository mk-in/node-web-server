const express = require('express');
const hbs = require('hbs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    // response.send({
    //     name: 'User',
    //     Likes: [
    //         'Node',
    //         'SAP',
    //         'Python'
    //     ]
    // });

    response.render('home.hbs', { 
        pageTitle: 'Home page',
        welcomeMessage: "Welcome to my website. You are in year"
    })
});

app.get('/about', (request, response) => {
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
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
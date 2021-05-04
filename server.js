const express = require('express');
const app = express();
const expbs = require('express-handlebars').create({defaultLayout:"main"});
const port = process.env.PORT || 3000;

app.use(express.static("views/css"));
app.use(express.static("views/jq"));
app.use(express.static("views/js"));
app.use(express.static("views/images"));

app.engine("handlebars",expbs.engine);
app.set('view engine', 'handlebars');


//Routing
app.get("/", (req, res) => {
    res.render('index', {
        title: 'Home Page'
    });
});

app.get("/index", (req, res) => {
    res.render('index', {
        title: 'Home Page'
    });
});

app.get('/ContactUs-Register.html', (req, res) => {
    res.render('ContactUs-Register', {title: 'Contact Us' } );
});

app.get('/STLOF', (req, res) => {
    res.render('STLOF', {title: 'Stocks To Look Out For' } );
});

app.get('/strategies', (req, res) => {
    res.render('strategies', {title: 'strategies' } );
});

app.get('/wisdom', (req, res) => {
    res.render('wisdom', {title: 'wisdom' } );
});

app.listen(port, () => {
    console.log('Server is starting at port', port); 
});

app.use((req,res) => {
    res.render('404', {
        title:'Nope!'
    }); 
});

/*Http.createServer(function(req,res) {
    var path = req.url.replace('/\/?(?:\?.*)?$/','').toLowerCae();

    switch(path) {
        case'/':
            serveStaticFile(res, '/public/index.html', 'text/html');
            break;
        
    }
}) */

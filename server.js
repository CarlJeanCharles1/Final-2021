const express = require('express');
const app = express();
const mysql = require('my-sql');
var bodyParser = require('body-parser');
var session = require('express-session');
const expbs = require('express-handlebars').create({defaultLayout:"main"});
const port = process.env.PORT || 3000;

app.use(express.static("views/css"));
app.use(express.static("views/jq"));
app.use(express.static("views/js"));
app.use(express.static("views/images"));

app.engine("handlebars",expbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// acessing mysql database
const connection = mysql.createConnection({
  host:'192.185.2.183',
  database:'mjackson_finalproject',
  user:'mjackson_finalp',
  password:'password',
  port:'3306',
});

connection.connect(function(err){
  if(err){
    throw err;
  }else{
    console.log("Connection Successful!");
  }
});

connection.query("SELECT username, email FROM Login ", (err, result,fields)=> {
  if(err){
    return console.log(err);
  }else{
    console.log(result);
  }
});


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

app.get('/movielist.html', (req, res) => {
    res.render('movielist', {title: 'Movie List' } );
});

app.get('/Reviews.html', (req, res) => {
    res.render('Reviews', {title: 'Reviews' } );
});

app.get('/index.html', (req, res) => {
    res.render('Index', {title: 'Index' } );
});

app.get('/dashboard.html', (req, res) => {
  if(req.session.loggedinUser){
      res.render('dashboard',{title: 'Dashboard', username:req.session.username})
  }else{
      res.redirect('/ContactUs-Register.html');
  }

});

app.listen(port, () => {
    console.log('Server is starting at port', port);
});


// Signning in
app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var sql='SELECT * FROM Login WHERE username =? AND password =?';
    connection.query(sql, [username, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.username= username;
            res.redirect('/dashboard.html');
        }else{
            res.render('ContactUs-Register',{alertMsg:"Your Email Address or password is wrong"});
        }
    })
})

// Signing Out
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/ContactUs-Register.html');
});

// to store user input detail on post request
app.post('/register', function(req, res, next) {

    inputData ={
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    }

// check unique email address
var sql='SELECT * FROM Login WHERE email =? AND username=?';
connection.query(sql, [inputData.email, inputData.username] ,function (err, data, fields) {
 if(err) throw err;
 if(data.length === 1){
     var msg = inputData.email + "or" + inputData.username + "already exists";
 }else{
    // save users data into database
    var sql = 'INSERT INTO Login SET ?';
   connection.query(sql, inputData, function (err, data) {
      if (err) throw err;
           });
  var msg ="Your are successfully registered";
 }
 res.render('ContactUs-Register',{alertMsg:msg});
})

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

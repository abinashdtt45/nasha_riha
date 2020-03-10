const express = require('express')
const bodyParser = require('body-parser')
const shortid = require('shortid');
const alert = require('alert-node')
var bcrypt = require('bcryptjs')
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')
const {mongoose} = require('./connect')
const {User} = require('./database_schema/user.js')

//jAuthentication PAckages
var session = require('express-session')
var cookieParser = require('cookie-parser')
var passport = require('passport')

var app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(session({
  secret: 'asdfasdgfsdghfsddf',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
//All GET requests start here
app.get('/', (req, res) => {
	console.log(req.user)
	console.log(req.isAuthenticated())
	if(req.isAuthenticated()===true){
		res.render('profile')
	}else{
		res.render('home')
	}
    
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/profile',(req,res)=>{
	res.render('profile')
})
app.get('/team',(req,res)=>{
	res.render('team')
})
//All POST requests here
app.post('/register', (req, res) => {
    email_id = req.body.email
    User.findOne({
        email: email_id
    }, function(err, user) {
        if (err) res.redirect('/')
        if (user) {
            alert("There exists a user with that email. Please give a correct email.")
            res.redirect('/')
            return
        }
    })
    password = req.body.password
    cpassword = req.body.cpassword
    if (password.length < 8) {
        alert("Please select a password with length>= 8")
        res.redirect('/')
    } else {
        if (password != cpassword) {
            alert("Passwords don't match")
            res.redirect('/')
        } else if (password == cpassword) {
            id = shortid.generate()
            bcrypt.hash(password, 10, (err, hash) => {
                new User({
                    email: email_id,
                    password: hash,
                    id: id
                }).save().then((user) => {
                    console.log(user)
                    res.redirect('/login')
                })
            });
        }
    }
})
app.post('/login', (req, res) => {
    email = req.body.email
    pass = req.body.password
    User.findOne({
        email: email
    }, (err, user) => {
        if (err) {
            res.redirect('/login')
        }
        if (user) {
            bcrypt.compare(pass, user.password).then((result) => {
                if(result===true){
                	const user_id = user.id
                	req.login(user_id,(err)=>{
                		res.redirect('/profile')
                	})
                	return
                }else{
                	alert("Either password or email not matching")
                	res.redirect('/login')
                }
            });
        }
    })
})

//Serializing and Deserialising user session
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
  });
// App connection to port
app.listen(5000, () => {
    console.log("Connected to server at port 5000")
})
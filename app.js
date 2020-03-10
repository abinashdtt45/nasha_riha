const express = require('express')
const bodyParser = require('body-parser')

var app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))



//All GET requests start here

app.get('/',(req,res)=>{
	res.render('home')
})








//All POST requests here







// App connection to port

app.listen(5000,()=>{
	console.log("Connected to server at port 5000")
})
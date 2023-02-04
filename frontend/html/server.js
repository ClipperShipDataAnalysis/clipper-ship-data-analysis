const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://john:Jn4wXiyqcn6u1vGo@cluster0.lcwl3.mongodb.net/test")

app.get('/', (req, res) => {
    let name = "John";
    res.render('index', {userName: name});
})

app.listen(4000, function(){
    console.log('Server is running on port 4000');
})

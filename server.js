const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://john:Jn4wXiyqcn6u1vGo@cluster0.lcwl3.mongodb.net/test")

const moviesSchema = {
    index: Array,
    columns: Array,
    data: Array,
    index_names: Array,
    column_names: Array

}

const Movie = mongoose.model("Movie", moviesSchema);

app.get('/', (req, res) => {
    Movie.find({}, function(err, movies) {
        res.render('index', {
            moviesList: movies
        })
    })
})

app.listen(4000, function(){
    console.log('Server is running on port 4000');
})
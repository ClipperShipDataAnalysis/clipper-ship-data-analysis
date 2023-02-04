const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/clipper-ship-data-analysis'));

mongoose.connect("mongodb+srv://john:Jn4wXiyqcn6u1vGo@cluster0.lcwl3.mongodb.net/ClipperShipGrantData?retryWrites=true&w=majority")

const db = mongoose.connection;
const collection = db.collection('ClipperShipGrantData');

console.log(collection);

const moviesSchema = new mongoose.Schema({
    index: Array,
    columns: Array,
    data: Array,
    index_names: Array,
    column_names: Array
});


const Movie = mongoose.model("Movie", moviesSchema);

app.get('/', (req, res) => {
    collection.findOne({}, function(err, doc) {
        if (err) throw err;
        res.render('index', {
            moviesList: doc
        })
    });
})

app.listen(process.env.PORT || 4000, function() {
    console.log('Server is running!');
})
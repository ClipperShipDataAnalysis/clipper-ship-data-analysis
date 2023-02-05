const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/frontend'));

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

app.get('/data', (req, res) => {
	res.render("data");
}
)

app.get('/about', (req, res) => {
	res.render("about");
}
)

app.listen(process.env.PORT || 4000, function() {
    console.log('Server is running!');
})
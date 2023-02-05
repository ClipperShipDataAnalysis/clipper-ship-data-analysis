const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const { spawn } = require('child_process');
let { PythonShell } = require('python-shell');

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

app.post('/data', (req, res) => {
	console.log(req.body);
	// console.log(res);
	
	if(res.body == null) {
		console.log("data is null");
	}
	else{
		// Reading Python files
		var dataToSend;
		// spawn new child process to call the python script
		const python = spawn('python3', ['/frontend/xlstojson.py', req.body]);
  
	   // collect data from script
	   python.stdout.on('data', function (data) {
		dataToSend = data.toString();
	   });
  
	   python.stderr.on('data', data => {
		console.error(`stderr: ${data}`);
	   });
  
	   // in close event we are sure that stream from child process is closed
	   python.on('exit', (code) => {
	   console.log(`child process exited with code ${code}, ${dataToSend}`);
	   response.sendFile(`${__dirname}/public/result.html`);
	  }); 
	  res.render("data");
	}
});
	

app.listen(4000, function() {
    console.log('Server is running on port 4000');
})
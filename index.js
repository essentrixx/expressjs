import express from 'express';
import data from './data/mock.json' assert { type: 'json' };

const app = express();
const PORT = 3000;

// Using the public folder at the root of the project  // middleware function
app.use(express.static('public'));  // app.use => file path, e.static => html css js img... files

// Using the images folder at the route /images
app.use('/images', express.static('images')); // route, pull from folder images

// Using express.json and express.urlencoded
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

//GET
app.get('/', (req, res) => {   // root
    res.json(data);
});

//POST - express.json and express.urlencoded
app.post('/item', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

//GET - download method
app.get('/download', (req, res) => {
    res.download('images/mountains_2.jpeg');
});

//GET - redirect method
app.get('/redirect', (req, res) => {
    res.redirect('https://www.linkedin.com');
});


//Route Chaining  //postman mhar get post put sann use kyi localhost:3000/class 
app.route("/class")
    .get((req, res) => {
        // res.send('Retrieve class info');
        throw new Error();
    })
    .post((req, res) => {
        res.send('Create class info');
    })
    .put((req, res) => {
        res.send('Update class info');
    });


//GET with next() function    // thrid arg but not recommend
app.get('/next', (req, res, next) => {
    console.log('The response will be sent by the next function');
    next();
}, (req, res) => {
    res.send('I just set up a route with a second callback');
});

// GET with routes
app.get('/class/:id', (req, res) => {  
    console.log(req.params);  // localhost:3000/class/10   => {id:10}
    const studentId = +req.params.id;   // req.params is an object that contains all route parameters as key-value pairs. (data)

    const student = data.filter(student => student.id === studentId);
    res.send(student);
});

// GET with routing parameteres
app.get('/class/:id', (req, res) => {  // /class/:id is a route parameter
    // Middleware Access routing parameters
    const studentId = +req.params.id;  // req.params.id specifically accesses the value of the id parameter from the URL.

    const student = data.filter(student => student.id === studentId);
    // Everthing above this line is middleware
    res.send(student);
});

//POST
app.post('/create', (req, res) => {
    res.send('This is a POST request at create');
});

//PUT
app.put('/edit', (req, res) => {
    res.send('This is a PUT request at edit');
});

//DELETE
app.delete('/delete', (req, res) => {
    res.send('This is a DELETE request at delete');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(PORT, () => {
    console.log(`The sever is running on port ${PORT}`);
});
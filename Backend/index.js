require('dotenv').config()

//Create mongoose
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const postsRoutes = require('./src/routes/posts')
const userRoutes = require('./src/routes/users')

const app = express(); //create express app
const PORT = process.env.PORT
const DB_CONNECT = process.env.MONGODB_CONNECT


//const s3Router = require('./src/controllers/s3controller')



// Import route modules
//const exampleRoute = require('./src/routes/exampleRoute');

//more middleware?
// Middleware, maybe put in middleware file?
//app.use(express.json()); // for parsing application/json
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//middlware for the cors
app.use(cors());

//app.get('/image', s3Router)


//postRoutes goes to posts file under route folder that organizes requests ex. user calls /api/posts/ex_function_inposts then that reqeust is executed
app.use('/api/posts',postsRoutes); //bascially if call to api/post, then call post routes
app.use('/api/users',userRoutes);



//Connect to db
mongoose.connect(DB_CONNECT)
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`YAY Server is running on http://localhost:${PORT}`);
          });
    })
    .catch((error)=>{
        console.log("Error Connecting to Database")
    })






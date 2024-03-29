const mongoose = require('mongoose');
const RecipePosts = require('../models/postModel'); // Update with the correct path
const DB_CONNECT = process.env.MONGODB_CONNECT

mongoose.connect(`${DB_CONNECT}`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function () {
  console.log("Connected to the database.");

  RecipePosts.collection.dropIndex('title_text_body_text', function(err, result) {
    if (err) {
        console.log('Error dropping index:', err);
    } else {
        console.log('Index dropped:', result);
       
    }
   
    mongoose.connection.close();
  });
});

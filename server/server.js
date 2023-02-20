const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/connection');
const dotenv = require('dotenv');
// get access to use dotenv
dotenv.config();

// Express middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// format it to json
app.use(express.json());



// read
app.get('/getAll', (req,res) => {
  // send to the front end a 200 success response
  res.json({
    success: true
  })
})



// create 
app.post('/insert', () => {

})


// update
app.post('/insert', () => {
  
})


// delete



// Start server after DB connection
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 3001 😄`);
  })

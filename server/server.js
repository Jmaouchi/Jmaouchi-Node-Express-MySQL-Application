const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/connection');
const dotenv = require('dotenv');
// get access to use dotenv
dotenv.config();
const apiRoutes = require('./route/apiRoutes')

// Express middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// format it to json
app.use(express.json());


// Use apiRoutes and attach /api at the front of every route url
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});


// Start server after DB connection
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 3001 😄`);
})

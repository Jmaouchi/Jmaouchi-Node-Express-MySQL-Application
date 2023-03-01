const express = require('express');
// express router
const router = express.Router();

// get access to every api route
router.use(require('./names'));



module.exports = router;
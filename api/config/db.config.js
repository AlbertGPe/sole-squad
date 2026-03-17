const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sole-squad'
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

mongoose.connect(MONGODB_URI)
 .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
 .catch(() => console.error('An error ocurred trying to connect to the database', error))
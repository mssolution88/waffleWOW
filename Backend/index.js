const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const cors=require('cors')
const bodyParser = require('body-parser');
const itemRoutes = require('./Routers/route');
dotenv.config();


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://mkrajput8808:U5zMZieRRDKSoQYN@waffleshop.g7avn.mongodb.net/`;
dns.setServers(['8.8.8.8', '8.8.4.4']); 
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.log("DB not connected", err);
});

db.on("connected", () => {
    console.log("DB connected");
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());


// Routes
app.use('/', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

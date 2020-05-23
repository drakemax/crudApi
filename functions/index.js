const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

//routes

//crud
//create
app.get('/HelloWorld', (req, resp) => {
    return resp.status(200).send('Hello World');

});

//read

//update

//delete

//export the api to the firebase cloud fnctions 
exports.app = functions.https.onRequest(app);
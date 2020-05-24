const functions = require("firebase-functions");
const admin = require("firebase-admin");

/* CustomElementRegistry firebaseConfig = {
  apiKey: "AIzaSyBPKxMYvb5bnqZeCG7EZjKuWpiAPP2uYmA",
  authDomain: "crudapi-2aee7.firebaseapp.com",
  databaseURL: "https://crudapi-2aee7.firebaseio.com",
  projectId: "crudapi-2aee7",
  storageBucket: "crudapi-2aee7.appspot.com",
  messagingSenderId: "479785766976",
  appId: "1:479785766976:web:39c6d42c775bdc37ea0fa5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); */

const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crudapi-2aee7.firebaseio.com",
});
const db = admin.firestore();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ origin: true })); // this will allow it to go to another domain

//routes
app.get("/HelloWorld", (req, resp) => {
  return resp.status(200).send("Hello World");
});
//crud
//create
app.post("/api/create", (req, resp) => {
  async () => {
    try {
      await db
        .collection("products")
        .doc("/" + req.body.id + "/")
        .create({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
        });
      return resp.status(200).send();
    } catch (error) {
      console.log(error);
      console.log("this request did not work");
      return resp.status(500).send(error);
    }
  };
});

//read
app.get("/api/read/:id", (req, resp) => {
  async () => {
    try {
      const document = db.collection("products").doc(req.param.id);
      let product = await document.get();
      let response = product.data();

      return resp.status(200).send(response);
    } catch (error) {
      console.log(error);
      console.log("this request did not work");
      return resp.status(500).send(error);
    }
  };
});

//update

//delete

//export the api to the firebase cloud fnctions
exports.app = functions.https.onRequest(app);

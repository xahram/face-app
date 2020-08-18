const faceapi = require('face-api.js')
const express = require("express")
const path = require('path')
const app = express()
const hbs = require("hbs")

const MODEL_URL = "../weights"
const publicFolder = path.join(__dirname, '../weights')
const viewsPath = path.join(__dirname, "../views")

app.use(express.static(publicFolder));
app.set("view engine", "hbs");
app.set("views", viewsPath)
await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
await faceapi.loadFaceLandmarkModel(MODEL_URL);
await faceapi.loadFaceRecognitionModel(MODEL_URL);

app.listen(7000, () => {
    console.log("Listening On port")
})
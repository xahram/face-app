const faceapi = require('face-api.js');
const MODEL_URL = "../weights";

await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
await faceapi.loadFaceLandmarkModel(MODEL_URL);
await faceapi.loadFaceRecognitionModel(MODEL_URL);


const input = document.getElementById('myImage')
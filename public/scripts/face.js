var MODEL_URL = "/weights";
// var net = new faceapi.SsdMobilenetv1()
var img = document.getElementById('img')
var inputField = document.getElementById('imgUpload')
var canvas = document.getElementById('canvas')

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    // net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
]).then((val) => {
    faceapi.detectSingleFace(img).then((value) => {
    console.log(value)
}).catch((err) => { console.log(err) })

}).catch((err) => {
    console.log(err)
})


var inputChangeListner = function (e) {
    var selectedFile = e.target.files[0];
    var reader = new FileReader();

   // // var imgtag = document.getElementById("img");
    img.title = selectedFile.name;

    reader.onload = function (event) {
        console.log(event)
        img.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
}
inputField.onchange = inputChangeListner


















// faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors().then((value) => {
//     console.log(value)
// }).catch((err) => {
//     console.log(err)
// })


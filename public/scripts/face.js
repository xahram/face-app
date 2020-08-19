const MODEL_URL = "/models";
Promise.all([faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)]).then((value) => {
    console.log(value)
}).catch((err) => {
    console.log(err)
})

const img = document.getElementById('img')
const inputField = document.getElementById('imgUpload')
const canvas = document.getElementById('canvas')

const inputChangeListner = function (e) {
    var selectedFile = e.target.files[0];
    var reader = new FileReader();

    // var imgtag = document.getElementById("img");
    img.title = selectedFile.name;

    reader.onload = function (event) {
        console.log(event)
        img.src = event.target.result;
    };
    // console.log(img.src)
    reader.readAsDataURL(selectedFile);
}
inputField.onchange = inputChangeListner





faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors().then((value) => {
    console.log(value)
}).catch((err) => {
    console.log(err)
})


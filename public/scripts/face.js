var MODEL_URL = "/weights";
// var net = new faceapi.SsdMobilenetv1()
var img = document.getElementById('img')
var inputField = document.getElementById('imgUpload')
var canvas = document.getElementById('canvas')

var inputChangeListner = async function (e) {
    var selectedFile = e.target.files[0];
    var reader = new FileReader();

    // // var imgtag = document.getElementById("img");
    img.title = selectedFile.name;

    reader.onload = function (event) {
        console.log(event)
        img.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
    const detections = await faceapi.detectSingleFace(img)
    const imageDimensions = { width: img.width, height: img.height }
    const resizedDetections = faceapi.resizeResults(detections, imageDimensions)
    faceapi.draw.drawDetections(canvas, detections)
}
inputField.onchange = inputChangeListner




const modelLoadingFaceApi = async () => {
    const modelTraining = await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        // net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ])
    return modelTraining
}
modelLoadingFaceApi().then(async (val) => {
    const detections = await faceapi.detectSingleFace(img)
    console.log(detections)
    const imageDimensions = { width: img.width, height: img.height }

    // const canvasResizing = { width: detections._box.width, height: detections._box.height }
    const canvasResizing = { width: img.width, height: img.height }
    faceapi.matchDimensions(canvas, canvasResizing)

    const resizedDetections = faceapi.resizeResults(detections, imageDimensions)
    faceapi.draw.drawDetections(canvas, resizedDetections)
}).catch((err) => { console.log(err) })


















// faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors().then((value) => {
//     console.log(value)
// }).catch((err) => {
//     console.log(err)
// })


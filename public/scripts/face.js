var MODEL_URL = "/weights";
// var net = new faceapi.SsdMobilenetv1()
var img = document.getElementById('img')
var inputField = document.getElementById('imgUpload')
var canvas = document.getElementById('canvas')



 
var inputChangeListner =  function (e) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
    var selectedFile = e.target.files[0];
    img.title = selectedFile.name;

    var reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    // You have to put the code of detectSingleFace inside of onload
    // Reason being readAsDataUrl function starts reading the file as base64
    // which is asynchronus. When the file reader finish reading the file
    // it triggers the event onload hence after  complete file reading 
    // image.src becomes equal to our newly uploaded image
    //For Further information on How file reader works check out mozilla docs https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    
    reader.onload = async function (event) {
        console.log(event.target)
        img.src = event.target.result;
        const detections = await faceapi.detectSingleFace(img)
    console.log(detections)
    try {

        const imageDimensions = { width: img.width, height: img.height }
        const resizedDetections = faceapi.resizeResults(detections, imageDimensions)
       console.log(resizedDetections)
        faceapi.draw.drawDetections(canvas, resizedDetections)

     
    } catch (error) {
        console.log(error)
    }
        // img.src = event.target.value;
    };
    
    



    

}








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


inputField.onchange = inputChangeListner















// faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors().then((value) => {
//     console.log(value)
// }).catch((err) => {
//     console.log(err)
// })


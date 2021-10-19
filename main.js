status = "";
// btn = document.getElementsByClassName("start-btn");

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    inputValue = document.getElementById("objectName").value;
}

function draw() {
    image(video, 0, 0, 480, 380);
}

function modelLoaded() {
    window.alert("Cocossd model is successfully loaded in the web app");
    status = true;
}
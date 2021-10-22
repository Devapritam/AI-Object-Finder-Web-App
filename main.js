objects = [];
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

function modelLoaded() {
    window.alert('Cocossd model is loaded successfully');
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);

        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status - Objects Detected";

            fill('#F10000');
            percent = objects[i].confidence * 100;
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#F10000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(inputValue == objects[i].label) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("objectStatus").innerHTML = "Object Mentioned Found";

                var synth = window.speechSynthesis;
                var data = inputValue + " found";
                var utterThis = new SpeechSynthesisUtterance(data);
                synth.speak(utterThis);
            }

            else {
                document.getElementById("objectStatus").innerHTML = "Object Mentioned Not Found";
            }
        }
    }
}

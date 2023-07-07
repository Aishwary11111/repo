var num = -1;
function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            var video = document.getElementById("videoElement");
            video.srcObject = stream;
            video.play();
            processVideo(stream);
        })
        .catch(function (error) {
            console.log("Error accessing video stream: ", error);
        });
}

function processVideo(stream) {
    var video = document.getElementById("videoElement");
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    function predictFrame() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var frame = canvas.toDataURL("image/jpeg");

        fetch("http://localhost:5001/livepredict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ frame: frame }),
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Error in prediction request");
                }
                return response.json();
            })
            .then(function (data) {
                num = data.result;
                if (data.result === -1) {
                    requestAnimationFrame(predictFrame);
                }
                else {
                    stopVideoStream();
                    document.getElementById('showvideo').style.display="none";
                    var id = data.result;
                    num=id;
                    var temp=frame;
                    display(id,temp);
                }
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    }
    predictFrame();
    // Stop video processing and release the video stream
    function stopProcessing() {
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }
    function stopVideoStream() {
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(function(track) {
              track.stop();
            });
            stream = null;
            videoElement.srcObject = null;
          }
    }
    // Stop video processing when the window is closed or refreshed
    window.addEventListener("beforeunload", stopProcessing);
}
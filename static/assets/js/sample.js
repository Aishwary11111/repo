function preprocessImage() {
    const fileInput = document.getElementById("imageFile");
    const file = fileInput.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        var imageDataUrl = reader.result;
        var img = new Image();
        img.addEventListener("load", function () {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            var frame = canvas.toDataURL("image/jpeg");
            console.log(frame);
            console.log(file);
        });
        var frame = imageDataUrl;
        fetch("http://localhost:5001/livepredict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ frame: frame }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse response as JSON
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .then((data) => {
                var id = data.result;
                num = id;
                document.getElementById('showphoto').style.display = "none";
                if (id === -1) {
                    alert("ENTER VALID IMAGE");
                    location.reload();
                }
                else {
                    display(id,frame);
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
    reader.readAsDataURL(file);
}
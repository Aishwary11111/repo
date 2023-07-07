var num;
function preprocessImage() {
  const fileInput = document.getElementById("imageFile");
  const file = fileInput.files[0];
  var formData = new FormData();
  formData.append("image", file);

  // Send the fetch request
  fetch('http://localhost:5001/preprocess', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse response as JSON
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then((data) => {
      var id = data.value;
      num=id;
      document.getElementById('showphoto').style.display = "none";
      if (id === -1) {
        alert("ENTER VALID IMAGE");
        location.reload();
      }
      else {
        if (file) {
          var reader = new FileReader();
          reader.onload = function () {
            var temp=reader.result;
            display(id, temp)
          };
          reader.readAsDataURL(file);
        }
      }
    })
    .catch(error => {
      console.error(error);
    });
}
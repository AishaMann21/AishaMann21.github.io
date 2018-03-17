document.querySelector('.upload-image-button').addEventListener('click', clickUploadImageButton);
document.querySelector('.upload-image-input').addEventListener('change', uploadImage);

function clickUploadImageButton() {
  document.querySelector('.upload-image-input').click();
}

function uploadImage() {
  var file = document.querySelector('.upload-image-input').files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    var imageUrl = reader.result;
    localStorage.photoUrl =   imageUrl;
    location.href = 'camerashow.html';
  }

  reader.readAsDataURL(file);
}

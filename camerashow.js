var photoUrl = localStorage.photoUrl;
document.querySelector('.image').src = photoUrl;
var base64photo = photoUrl.split(',')[1];

var sendEmailButton = document.querySelector('.send-email');
sendEmailButton.addEventListener('click', uploadImageToImgur);

function uploadImageToImgur() {
  sendEmailButton.textContent = 'Sending photo...';
  $.ajax({
    type: "POST",
    url: "https://api.imgur.com/3/image",
    datatype: "json",
    headers: {
      'Authorization': 'Client-ID f70aa3433b2bf0a'
    },
    data: {
      image: base64photo,
      type: 'base64'
    }
  }).done(function(response) {
   console.log(response);

   if (response.data && response.data.link) {
     var url = response.data.link;
     sendEmail(url);
   }
  });
}

function sendEmail(photoUrl) {
  var email = document.querySelector('.email').value;
  var description= document.querySelector('.description').value;
  var id= document.querySelector('.id').value;
  var subject = 'Check out this photo!';
  var content = '<img src="' + photoUrl + '" width="300">'+ ' '+ ' Student Id: ' + id + ' Description: ' + description;
  var fromEmail = 'SnapKlean@codeforward.tech';
  $.ajax({
    type: "POST",
    url: "https://mandrillapp.com/api/1.0/messages/send.json",
    data: {
      'key': 'VYHW7_yVxIuLSZFGiK4ORg',
      'message': {
        'from_email': fromEmail,
        'to': [
            {
              'email': email,
              'type': 'to'
            }
          ],
        'autotext': 'true',
        'subject': subject,
        'html': content
      }
    }
   }).done(function(response) {
     console.log(response);
     sendEmailButton.textContent = 'Send';
     location.href = 'thankyou.html';
   });

}

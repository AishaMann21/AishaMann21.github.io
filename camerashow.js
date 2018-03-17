// Get the photo URL from localStorage
var photoUrl = localStorage.photoUrl;
// Add the photo URL to the preview image source
document.querySelector('.image').src = photoUrl;
// Get the base 64 representation of the photo
var base64photo = photoUrl.split(',')[1];

// Add a click event listener to the "send email" button
var sendEmailButton = document.querySelector('.send-email');
sendEmailButton.addEventListener('click', uploadImageToImgur);

function uploadImageToImgur() {
  sendEmailButton.textContent = 'Sending photo...';
  // Make an AJAX request to the Imgur API to upload the base 64
  // photo to their website
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
  // The done function is called when the AJAX request is done
  }).done(function(response) {
   console.log(response);

   // If the AJAX request is successful, call the sendEmail()
   // function with the newly created Imgur link for the user's photo
   if (response.data && response.data.link) {
     var url = response.data.link;
     sendEmail(url);
   }
  });
}

function sendEmail(photoUrl) {
  // Initialize the email content variables
  var email = document.querySelector('.email').value;
  var description= document.querySelector('.description').value;
  var id= document.querySelector('.id').value;
  var subject = 'Check out this photo!';
  var content = '<img src="' + photoUrl + '" width="300">';
  var fromEmail = 'SnapKlean@codeforward.tech';
  // Make an AJAX request to the Mandrill API to send an email
  // with the email address, subject, and content specified above.
  $.ajax({
    type: "POST",
    url: "https://mandrillapp.com/api/1.0/messages/send.json",
    data: {
      'key': 'VYHW7_yVxIuLSZFGiK4ORg',
      'message': {
        // You can change this email address to anything@codeforward.tech
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
   // The done function is called when the AJAX request is done
   }).done(function(response) {
     console.log(response);
     sendEmailButton.textContent = 'Send';
     document.querySelector('.message').style.display = 'block';
   });
}

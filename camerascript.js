var video = document.querySelector("#videoElement");
var videoElement = document.getElementById("videoElement");

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var user_pic = new Image();
var snap_button= document.getElementById("snap");
var share_div = document.getElementById("share");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}


// Trigger photo take
snap_button.addEventListener("click", function() {
    console.log("snapped")
  context.drawImage(videoElement, 0, 0, 640, 480);
  user_pic.src = convertCanvasToImage(canvas);
  snap_button.hidden = true;
  share_div.hidden = false;
  videoElement.hidden = true;
  canvas.hidden = false;
});

// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
  image.src = canvas.toDataURL("images/png");
  document.getElementById("snapped_pic").href = image.src;
  document.getElementById("snapped_pic").click();
	return image;
}

function retake(){
  user_pic = null;
  snap_button.hidden = false;
  share_div.hidden = true;
  videoElement.hidden = false;
  canvas.hidden = true;
}


 document.getElementById('sharefb').addEventListener('click', function() {
  FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
          object : {
             'og:url': "https://sonalmahendru.github.io/facebookshare",
             'og:title': "test",
             'og:description': "description",
             'og:og:image:width': '2560',
             'og:image:height': '960',
             'og:image': user_pic.src
          }
      })
  });
});
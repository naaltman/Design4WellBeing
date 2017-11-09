// SDK Needs to create video and canvas nodes in the DOM in order to function
// Here we are adding those nodes a predefined div.
var divRoot = $("#affdex_elements")[0];
var width = 285;
var height = 265;
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;

var mood_playing = null;
var cur_song_index;
var song_list = [];

//Construct a CameraDetector and specify the image width / height and face detector mode.
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

//Enable detection of all Expressions, Emotions and Emojis classifiers.
detector.detectAllEmotions();
detector.detectAllExpressions();
detector.detectAllEmojis();
detector.detectAllAppearance();

//Add a callback to notify when the detector is initialized and ready for runing.
detector.addEventListener("onInitializeSuccess", function() {
  log('#logs', "The detector reports initialized");
  //Display canvas instead of video feed because we want to draw the feature points on it
  $("#face_video_canvas").css("display", "block");
  $("#face_video").css("display", "none");
});

function log(node_name, msg) {
  $(node_name).append("<span>" + msg + "</span><br />")
}

//function executes when Start button is pushed.
function onStart() {
  if (detector && !detector.isRunning) {
    $("#logs").html("");
    detector.start();
  }
  log('#logs', "Clicked the start button");
}

//function executes when the Stop button is pushed.
function onStop() {
  log('#logs', "Clicked the stop button");
  if (detector && detector.isRunning) {
    detector.removeEventListener();
    detector.stop();
  }
};

//function executes when the Reset button is pushed.
function onReset() {
  log('#logs', "Clicked the reset button");
  if (detector && detector.isRunning) {
    detector.reset();

    $('#results').html("");
  }
};

//Add a callback to notify when camera access is allowed
detector.addEventListener("onWebcamConnectSuccess", function() {
  // log('#logs', "Webcam access allowed");
  console.log("Webcam access allowed");
});

//Add a callback to notify when camera access is denied
detector.addEventListener("onWebcamConnectFailure", function() {
  // log('#logs', "webcam denied");
  console.log("Webcam access denied");
});

//Add a callback to notify when detector is stopped
detector.addEventListener("onStopSuccess", function() {
  log('#logs', "The detector reports stopped");
  $("#results").html("");
});

//Add a callback to receive the results from processing an image.
//The faces object contains the list of the faces detected in an image.
//Faces object contains probabilities for all the different expressions, emotions and appearance metrics
detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
  $('#results').html("");
  log('#results', "Timestamp: " + timestamp.toFixed(2));
  log('#results', "Number of faces found: " + faces.length);
  if (faces.length > 0) {
    drawFeaturePoints(image, faces[0].featurePoints);
    var emotion_counter = {
      'disappointed':0,
      'laughing':0,
      'rage':0,
      'relaxed':0,
      'smile':0}

    if(faces[0].emojis.dominantEmoji.codePointAt(0) == 128542){
       // disappointed
      emotion_counter['disappointed'] = emotion_counter['disappointed'] + 1;
    }
    else if(faces[0].emojis.dominantEmoji.codePointAt(0) == 128514){
      // laughing
      emotion_counter['laughing'] = emotion_counter['laughing'] +1;
    }
    else if(faces[0].emojis.dominantEmoji.codePointAt(0) == 128545){
      // rage
      emotion_counter['rage'] = emotion_counter['rage'] +1;
    }
    else if(faces[0].emojis.dominantEmoji.codePointAt(0) == 128528){
      // relaxed
      emotion_counter['relaxed'] = emotion_counter['relaxed'] +1;
    }
    else if(faces[0].emojis.dominantEmoji.codePointAt(0) == 9786 || faces[0].emojis.dominantEmoji.codePointAt(0) == 128515){
      // smiley or big smiley
      emotion_counter['smile'] = emotion_counter['smile'] +1;
    }

    setTimeout(function(){
      var max = 0;
      var emotion="";
      for(key in emotion_counter){
        if (emotion_counter[key] > max){
          max = emotion_counter[key];
          emotion = key;
        }
      }
      if(emotion == ""){
        emotion = "relaxed"; // set default emotion to be relaxed
      }
      // if(mood_playing){
      //   play_audio('stop',mood_playing);
      // }
      console.log('playing music for emotion', emotion);
      // play_audio('play',emotion);
      // mood_playing = emotion;

      // SOMEHOW SEND THE PLAYER THE EMOTION HERE AND CLICK PLAY AND THEN U DID IT GOOD JOB
      player.mood = emotion;

      console.log('set player mood to be', player.mood);
      console.log('playlist is ', player.playlist);

      // player.random_song(emotion);
      player.play()

    }, 15 *1000);

    }
});

//Draw the detected facial feature points on the image
function drawFeaturePoints(img, featurePoints) {
  var contxt = $('#face_video_canvas')[0].getContext('2d');

  var hRatio = contxt.canvas.width / img.width;
  var vRatio = contxt.canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);

  contxt.strokeStyle = "#FFFFFF";
  for (var id in featurePoints) {
    contxt.beginPath();
    contxt.arc(featurePoints[id].x,
      featurePoints[id].y, 2, 0, 2 * Math.PI);
    contxt.stroke();

  }
}

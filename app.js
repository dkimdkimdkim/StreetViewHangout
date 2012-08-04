
// Keep track of this
var canvas = document.getElementById('canvas');

// Keep track of recent events.
var lastGoodEvent;
var lastEvent;

// Are we mirroring our face render?
var mirrored = true;

/** Draw face on canvas */
function drawFace(event, bright) {
    var context = canvas.getContext('2d');

    context.setTransform(1,0,0,1,0,0);

    // The coordinates are screenspace, from -0.5 - 0.5,
    // so start drawing from the middle.
    context.translate(300,338/2);

    // We're going to scale the points by the size
    // of my canvas, roughly.  Aspect ratio is usually
    // 16:9
    var faceScaleX = 600;
    var faceScaleY = 338;

    // Flip our axes as needed.
    // All points are in camera-space---they
    // are as you look to others, not
    // how you look to yourself, since your
    // local video feed is mirrored.
    if (mirrored) {
        context.scale(-1, 1);
    }

    if (bright) {
        context.strokeStyle = '#FF0000';
        context.fillStyle = '#FF0000';
    } else {
        context.strokeStyle = '#555555';
        context.fillStyle = '#555555';
    }

    // Draw all the points.
    context.beginPath();
    context.arc(faceScaleX * event.leftEyebrowLeft.x,
        faceScaleY * event.leftEyebrowLeft.y, 5, 0, 2*Math.PI);
    context.arc(faceScaleX * event.leftEyebrowRight.x,
        faceScaleY * event.leftEyebrowRight.y, 5, 0, 2*Math.PI);
    context.arc(faceScaleX * event.rightEyebrowLeft.x,
        faceScaleY * event.rightEyebrowLeft.y, 5, 0, 2*Math.PI);
    context.arc(faceScaleX * event.rightEyebrowRight.x,
        faceScaleY * event.rightEyebrowRight.y, 5, 0, 2*Math.PI);
    context.arc(faceScaleX * event.leftEye.x,
        faceScaleY * event.leftEye.y, 5, 0, 2*Math.PI);
    context.arc(faceScaleX * event.rightEye.x,
        faceScaleY * event.rightEye.y, 5, 0, 2*Math.PI);
    context.arc(faceScaleX * event.noseRoot.x,
        faceScaleY * event.noseRoot.y, 5, 0, 2*Math.PI);
    context.arc(faceScaleX * event.noseTip.x,
        faceScaleY * event.noseTip.y, 5, 0, 2*Math.PI);
    context.arc(faceScaleX * event.mouthLeft.x,
        faceScaleY * event.mouthLeft.y, 5, 0, 2*Math.PI);
    context.arc(faceScaleX * event.mouthCenter.x,
        faceScaleY * event.mouthCenter.y, 5, 0, 2*Math.PI);    
    context.arc(faceScaleX * event.mouthRight.x,
        faceScaleY * event.mouthRight.y, 5, 0, 2*Math.PI);
    context.arc(faceScaleX * event.upperLip.x,
        faceScaleY * event.upperLip.y, 5, 0, 2*Math.PI);
    context.fill();
    
    // Draw all the lines.
    context.beginPath();
    context.moveTo(faceScaleX * event.leftEyebrowLeft.x,
        faceScaleY * event.leftEyebrowLeft.y);
    context.lineTo(faceScaleX * event.leftEyebrowRight.x,
        faceScaleY * event.leftEyebrowRight.y);
    context.moveTo(faceScaleX * event.rightEyebrowLeft.x, 
        faceScaleY * event.rightEyebrowLeft.y);
    context.lineTo(faceScaleX * event.rightEyebrowRight.x, 
        faceScaleY * event.rightEyebrowRight.y);
    context.moveTo(faceScaleX * event.noseRoot.x, faceScaleY * event.noseRoot.y);
    context.lineTo(faceScaleX * event.noseTip.x, faceScaleY * event.noseTip.y);
    context.moveTo(faceScaleX * event.mouthLeft.x, faceScaleY * event.mouthLeft.y);
    context.lineTo(faceScaleX * event.mouthCenter.x, faceScaleY * event.mouthCenter.y);
    context.lineTo(faceScaleX * event.mouthRight.x, faceScaleY * event.mouthRight.y);
    context.lineTo(faceScaleX * event.upperLip.x, faceScaleY * event.upperLip.y);
    context.lineTo(faceScaleX * event.mouthLeft.x, faceScaleY * event.mouthLeft.y);
    context.stroke();
}

/** Draws the roll, pan, and tilt of your head. */
function drawRollPanTilt(event, bright) {
    var context = canvas.getContext('2d');
    // Draw eyes
    if (bright) {
        context.strokeStyle = '#FF0000';
        context.fillStyle = '#FF0000';
    } else {
        context.strokeStyle = '#555555';
        context.fillStyle = '#555555';      
    }

    context.setTransform(1,0,0,1,0,0);

    context.translate(300, 345);
    context.beginPath();
    context.arc(0, 0, 10, 0, 2 * Math.PI);
    context.stroke();

    context.font = '24pt Arial';
    context.textAlign = 'center';
    
    var arrowScale = 100;
    context.translate(-200, 0);
    context.fillText("Roll", 0, -10);
    context.beginPath();
    context.arc(0, 0, arrowScale/2, 0, 2*Math.PI);
    context.stroke();
    context.beginPath();
    context.moveTo(-Math.cos(event.roll) * arrowScale/2,
        -Math.sin(event.roll) * arrowScale/2);
    context.lineTo(Math.cos(event.roll) * arrowScale/2,
        Math.sin(event.roll) * arrowScale/2);
    context.stroke();

    var sign = event.pan > 0 ? -1 : 1;
    context.translate(200, 0);
    context.fillText("Pan", 0, -10);
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(event.pan * arrowScale, 0);
    context.lineTo(event.pan * arrowScale + sign * 10, 10);
    context.lineTo(event.pan * arrowScale + sign * 10, -10);
    context.lineTo(event.pan * arrowScale, 0);
    context.stroke();

    sign = event.tilt < 0 ? -1 : 1;
    context.translate(200, 0);
    context.textAlign = 'left';
    context.fillText("Tilt", 10, -10);
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(0, -event.tilt * arrowScale);
    context.lineTo(10, -event.tilt * arrowScale + sign * 10);
    context.lineTo(-10, -event.tilt * arrowScale + sign * 10);
    context.lineTo(0, -event.tilt * arrowScale);
    context.stroke();
}

/** Per-frame render */
function drawFrame() {
    var context = canvas.getContext('2d');

    // Clear the canvas
    context.setTransform(1,0,0,1,0,0);
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0,0,600,400);

    if (lastGoodEvent) {
        drawFace(lastGoodEvent, lastEvent.hasFace);
        drawRollPanTilt(lastGoodEvent, lastEvent.hasFace);
    }
}

/** Animation loop */
function animate(){
    drawFrame();
    // request new frame
    requestAnimFrame(function () {
        animate();
    });
}

/** Standard requestAnimFrame from paulirish.com, running 30 fps */
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 30);
    };
})();

/** Event handler */
function onFaceTrackingChanged(event) {
    try {
        lastEvent = event;
        if (event.hasFace) {
            lastGoodEvent = event;
        }
    } catch(e) {
        console.log("onFaceTrackingChanged: ERROR");
        console.log(e);
    }
}

/** Sets up event handler and shows a topHat
 * from the Media app to indicate who is the current
 * face tracked.
 */
function startHeadTracking() {
    // Create hat overlay.
    var topHat = gapi.hangout.av.effects.createImageResource(
        'http://hangoutmediastarter.appspot.com/static/topHat.png');
    var overlay = topHat.createFaceTrackingOverlay(
        {'trackingFeature':
         gapi.hangout.av.effects.FaceTrackingFeature.NOSE_ROOT,
         'scaleWithFace': true,
         'rotateWithFace': true,
         'scale': 1.0});
    overlay.setVisible(true);

    // Add event handler.
    gapi.hangout.av.effects.onFaceTrackingDataChanged.
        add(onFaceTrackingChanged);

    console.log('Started head tracking');    
}

function onMirrorClicked() {
    var checkbox = document.getElementById('mirror');
    mirrored = checkbox.checked;
}

function init() {
  // When API is ready...                                                
  gapi.hangout.onApiReady.add(
      function(eventObj) {
        if (eventObj.isApiReady) {
            startHeadTracking();
            animate();
        }
      });
}

// Wait for gadget to load.                                         
gadgets.util.registerOnLoadHandler(init);


var State = function() {

}

var state = new State();

var runIntervalId = 0;

function start() {
	runIntervalId = setInterval(run, 100);
}

function run() {
	var newState = hasStateChanged(state);
	if (newState) {
		updateCanvas(state);
	}
}
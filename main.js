function setup() {
  canvas = createCanvas(600, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelloaded)
}
function modelloaded(){
  console.log("Model")
}
function draw(){
  image(video, 0, 0, 600, 400)
  classifier.classify(video, gotResult)
}
previousresult = ""
function gotResult(error, result){
  if (error) {
    console.log(error)
  } else {
    if ((previousresult != result[0].label) && (result[0].confidence > 0.5)) {
      console.log(result)
      document.getElementById("span1").innerHTML = result[0].label
      document.getElementById("span2").innerHTML = result[0].confidence.toFixed(2)
      syth = window.speechSynthesis
      speakdata = result[0].label
      audio = new SpeechSynthesisUtterance(speakdata)
      syth.speak(audio)
    }
  }
}
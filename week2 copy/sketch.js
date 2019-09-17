//Coding Train: ml5.js: KNN Classification Part 1 - 3 https://youtu.be/KTNqXwkLuM4

let video;
let features;
let knn;
let labelP;
let ready = false;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide()
  features = ml5.featureExtractor('MobileNet', modelReady);

  labelP = createP("HELLO WORLD!!");
  labelP.style("font-size", "32pt");
}



function goClassify() {
  const logits = features.infer(video);
  knn.classify(logits, function(error, result) {
    if (error) {
      console.error(error);
    } else {
      labelP.html(result.label);
      goClassify();
    }
  });
}


// function mousePressed() {
//   if (knn.getNumLabels() > 0) {
//     const logits = features.infer(video);
//     knn.classify(logits, gotResults);
//   }
// }

function keyPressed() {
  const logits = features.infer(video);
  if (key == "h") {
    knn.addExample(logits, "H");
    console.log("H");
  } else if (key == "e") {
    knn.addExample(logits, "E");
    console.log("E");
  } else if (key == "l") {
    knn.addExample(logits, "L");
    console.log("L");
   }  else if (key == "L") {
      knn.addExample(logits, "L");
      console.log("L");
  } else if (key == "o") {
    knn.addExample(logits, "O");
    console.log("O");
  } else if (key == "w") {
    knn.addExample(logits, "W");
    console.log("W");
  } else if (key == "r") {
    knn.addExample(logits, "R");
    console.log("R");
  } else if (key == "d") {
    knn.addExample(logits, "D");
    console.log("D");
    // window.alert("HELLO WORLD!!!");
    // document.write("D");

  } else if (key == "s") {
    //check version if json doesn't save
    knn.save("model.json");

  }
}
// console.log(logits);
// console.log(logits.dataSync());
// logits.print();


function modelReady() {
  console.log("MobileNet loaded!");
  knn = ml5.KNNClassifier();
  knn.load("model.json", function() {
    console.log('KNN Data Loaded')
    goClassify();
  });
}

function draw() {
  background(51);
  image(video, 0, 0);
  // if (!ready && knn.getNumLabels() > 0) {
  //   goClassify();
  //   ready = true;
  // }
}

const saveFile = (name, data) => {
  const downloadElt = document.createElement('a');
  const blob = new Blob([data], { type: 'octet/stream' });
  const url = URL.createObjectURL(blob);
  downloadElt.setAttribute('href', url);
  downloadElt.setAttribute('download', name);
  downloadElt.style.display = 'none';
  document.body.appendChild(downloadElt);
  downloadElt.click();
  document.body.removeChild(downloadElt);
  URL.revokeObjectURL(url);
};

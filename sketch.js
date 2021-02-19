let emojiData = {
    smile: ["🙂", "😊", "😀", "😃", "☺️"],
    laugh: ["😄", "😁", "😆", "😂", "🤣"],
    sad: ["😞", "😔", "😟", "☹️", "😣"],
    cry: ["😖", "😫", "😩", "😢", "😭"],
    annoyed: ["😐", "😑", "😳", "🤨"],
    surprise: ["😯", "😦", "😧", "😮", "😲", "😱"],
    angry: ["😤", "😠", "😡", "🤬"],
    heart: ["❤️", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝"],
};

let emojiString;

let shapeClassifier;
let canvas;
let resultsDiv;
let inputImage;

function setup() {
    canvas = createCanvas(512, 512);
    let options = {
        inputs: [64, 64, 4],
        task: "imageClassification",
        debug: false,
    };
    shapeClassifier = ml5.neuralNetwork(options);
    const modelData = {
        model: "model/model.json",
        metadata: "model/model_meta.json",
        weights: "model/model.weights.bin",
    };
    background(255);
    resultsDiv = createDiv("loading model");
    inputImage = createGraphics(64, 64);
    shapeClassifier.load(modelData, modelLoaded);
}

function modelLoaded() {
    console.log("model ready");
    resultsDiv.html(`model loaded`);
    classifyImage();
}

function classifyImage() {
    inputImage.copy(canvas, 0, 0, width, height, 0, 0, 64, 64);
    image(inputImage, 0, 0);

    shapeClassifier.classify({ image: inputImage }, gotResults);
}

function gotResults(err, results) {
    if (err) {
        console.error(err);
        return;
    }

    let label = results[0].label;
    // let label1 = results[1].label;
    // let confidence = nf(100 * results[0].confidence, 2, 0);
    // let confidence2 = nf(100 * results[1].confidence, 2, 0);
    // resultsDiv.html(`${label} ${confidence}% ${label1} ${confidence2}`);
    let emojis = seeEmoji(label);
    resultsDiv.html(`${label} ${emojis}`);

    console.log(results);
    classifyImage();
}

function draw() {
    //background(255);
    stroke(0);
    fill(0, 0);
    strokeWeight(32);
    if (mouseIsPressed) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }

    // let a1, a2, a3;
    // let r1 = random(18, 32);
    // let r2 = random(18, 32);
    // let x = random(r1 + 2, width - r1 - 2);
    // let y = random(8, height - r2 - 2);
    // arc(width/2, height/2, 40, 40, 0, PI);
    // a1 = createVector(random(width/3), random(height/2));
    // a2 = createVector(random(width/3, 2*width/3), random(height/2, height));
    // a3 = createVector(random(2*width/3, width), random(a1.y - 5, a1.y + 5));
    // line(a1.x, a1.y, a2.x, a2.y);
    // line(a2.x, a2.y, a3.x, a3.y);
}

function seeEmoji(category) {
    emojiString = "";
    switch (category) {
        case "smile": {
            for (let i = 0; i < emojiData.smile.length; i++) {
                let temp = emojiData.smile[i];
                emojiString = `${emojiString}${temp}`;
            }
            break;
        }
        case "laugh": {
            for (let i = 0; i < emojiData.laugh.length; i++) {
                let temp = emojiData.laugh[i];
                emojiString = `${emojiString}${temp}`;
            }
            break;
        }
        case "sad": {
            for (let i = 0; i < emojiData.sad.length; i++) {
                let temp = emojiData.sad[i];
                emojiString = `${emojiString}${temp}`;
            }
            break;
        }
        case "cry": {
            for (let i = 0; i < emojiData.cry.length; i++) {
                let temp = emojiData.cry[i];
                emojiString = `${emojiString}${temp}`;
            }
            break;
        }
        case "annoyed": {
            for (let i = 0; i < emojiData.annoyed.length; i++) {
                let temp = emojiData.annoyed[i];
                emojiString = `${emojiString}${temp}`;
            }
            break;
        }
        case "surprise": {
            for (let i = 0; i < emojiData.surprise.length; i++) {
                let temp = emojiData.surprise[i];
                emojiString = `${emojiString}${temp}`;
            }
            break;
        }
        case "angry": {
            for (let i = 0; i < emojiData.angry.length; i++) {
                let temp = emojiData.angry[i];
                emojiString = `${emojiString}${temp}`;
            }
            break;
        }
        case "hearts": {
            for (let i = 0; i < emojiData.heart.length; i++) {
                let temp = emojiData.heart[i];
                emojiString = `${emojiString}${temp}`;
            }
            break;
        }
        default:
            break;
    }
    return emojiString;
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API#Creating_a_frequency_bar_graph
// Global Variables for the Graphics
let canvasWidth  = 1024;
let canvasHeight = 256;
let graphicsContext;  

function setupCanvas(canvasID) {
    let control = document.getElementById(canvasID);
    graphicsContext = control.getContext("2d");
    clearCanvas();
}

function clearCanvas() {
    graphicsContext.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawFrequencies( freqs ) {
    clearCanvas();
    let barWidth = (canvasWidth / freqs.length);
    let barHeight;
    let x = 0;

    for(let i = 0; i < freqs.length; i++) {
        // The height is a value from 0 to 255, which matches our canvas height
        barHeight = freqs[i];
        // Change the colour based on how height it is, to make nice gradient effect
        graphicsContext.fillStyle = 'rgb(50,' + (barHeight+100) + ',50)';
        // And draw the bar as if coming up from the bottom
        graphicsContext.fillRect(x,canvasHeight-barHeight/2,barWidth,barHeight);
        x += barWidth + 1;
      }
    };

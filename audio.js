// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
// Global Variables for Audio
let frequencyAnalyzer;
let frequencyData;

function setupWebAudio( audioControlID, fftSize ) {

    // Get the root object of all audio flexibilty
    let audioContext = new(window.AudioContext || window.webkitAudioContext)();

    // Get the audio controls DOM element, and with it great media element source
    let audioControl = document.getElementById(audioControlID);
    let audioSource = audioContext.createMediaElementSource(audioControl);
    // Once we create the audio source, the standard control will no longer
    // play, so route the output of the audio to the speakers/headphones
    audioSource.connect(audioContext.destination);

    // Create an analyser which can do FFT for us
    frequencyAnalyzer = audioContext.createAnalyser();
    frequencyAnalyzer.fftSize = fftSize;
    frequencyAnalyzer.minDecibels = -90;
    frequencyAnalyzer.maxDecibels = -10;
    //frequencyAnalyzer.smoothingTimeConstant = 0.85;

    // Make an fast array we can return the frequency data in, of the correct length
    frequencyData = new Uint8Array(frequencyAnalyzer.frequencyBinCount);

    // Hook up the audioSource sends data to the analyser
    audioSource.connect(frequencyAnalyzer);
}

// Get the latest freqeuency data from the FFT in the analyzer
function getFrequencies() {
    frequencyAnalyzer.getByteFrequencyData(frequencyData);
    return frequencyData;
}
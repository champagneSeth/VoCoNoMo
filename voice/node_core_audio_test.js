var Module = require('./pocketsphinx.js');

// Create a new instance of node-core-audio 
var coreAudio = require("node-core-audio");
 
// Create a new audio engine 
var engine = coreAudio.createNewAudioEngine();
 
// Add an audio processing callback 
// This function accepts an input buffer coming from the sound card, 
// and returns an ourput buffer to be sent to your speakers. 
// 
// Note: This function must return an output buffer 
function processAudio( inputBuffer ) {
    console.log( "%d channels", inputBuffer.length );
    console.log( "Channel 0 has %d samples", inputBuffer[0].length );


    var recognizer = new Module.Recognizer();
    var buffer = new Module.AudioBuffer();
    for (var i = 0 ; i < array.length ; i++)
        buffer.push_back(array[i]); // Feed the array with audio data
    var output = recognizer.start(); // Starts recognition on current language model
    output = recognizer.process(buffer); // Processes the buffer
    var hyp = recognizer.getHyp(); // Gets the current recognized string (hypothesis)
    /* ... */
    for (var i = 0 ; i < array.length ; i++)
        buffer.set(i, array[i]); // Feed buffer with new data
    output = recognizer.process(buffer);
    hyp = recognizer.getHyp();
    /* ... */
    output = recognizer.stop();
    // Gets the final recognized string:
    var final_hyp = recognizer.getHyp();
    buffer.delete(); 
    recognizer.delete();

    console.log('we made it');
    console.log(final_hyp);

    return inputBuffer;
}
 
engine.addAudioCallback( processAudio );





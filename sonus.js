var PS          = require('./lib/pocketsphinx.js')
,   record      = require('./lib/record')
,   init        = require('./lib/recognizer.js')
,   fs          = require('fs')
,   recognizer
;

//test();
module.exports  = {
    sonus       : sonus
,   recognize   : recognizeBuffer
}

function sonus() {
    recognizer = init();
}

function test() {

    var count = 3;
    function countDown() {
        console.log(count);
        count -= 1;
        if (count > 0) {
            setTimeout(countDown, 1000);
        } else {
            console.log('Go!');
            record('wav/woo', 3);
            setTimeout(function () {
                recognizeWav('wav/woo');
            }, 4000)
        }
    }

    recognizer = init();

    console.log('\n\nRecording in...');
    countDown();
}

function recognizeWav(fileName) {
    var buffer  = new PS.AudioBuffer()
    ,   audio   = fs.createReadStream(fileName + '.wav')
    ,   output
    ,   hyp
    ; 

    audio.on('data', function (chunk) {
        for (var i = 0; i < chunk.length; i += 1) {
            buffer.push_back(chunk.readUInt8(i));
        }

    }).on('end', function () {
        output  = recognizer.start();
        output  = recognizer.process(buffer);
        output  = recognizer.stop();

        hyp     = recognizer.getHyp();
        console.log(hyp);
        console.log('done');
        
        buffer.delete();
        recognizer.delete();
    });
}

function recognizeBuffer(audio) {
    var buffer  = new PS.AudioBuffer()
    ,   output
    ,   hyp
    ; 

    audio.on('data', function (chunk) {
        for (var i = 0; i < chunk.length; i += 1) {
            buffer.push_back(chunk.readUInt8(i));
        }

    }).on('end', function () {
        output  = recognizer.start();
        output  = recognizer.process(buffer);
        output  = recognizer.stop();

        hyp     = recognizer.getHyp();
        console.log(hyp);
        console.log('done');
        
        buffer.delete();
        recognizer.delete();
    });
}

var PS          = require('./lib/jacksphinx.js')
,   record      = require('./lib/record')
,   fs          = require('fs')
,   recognizer
;

PS = require('./model/dict.js')(PS);
PS = require('./model/lm.js')(PS);

test();
module.exports  = {
    sonus       : sonus
,   recognize   : recognizeBuffer
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
                recognizeBuffer(wavToBuffer('wav/woo'));
            }, 4000);
        }
    }

    recognizer = init();

    console.log('\n\nRecording in...');
    countDown();
}

function sonus() {
    recognizer = init();
}

function init() {
    var config = new PS.Config();
    config.push_back(['-fwdflat',   'no']);
    config.push_back(['-lm',        'jack.lm']);
    config.push_back(['-dict',      'jack.dic']);

    recognizer = new PS.Recognizer(config);
    config.delete();

    return recognizer;
}

function end() {
    recognizer.delete();
}

function wavToBuffer(fileName) {
    return fs.createReadStream(fileName + '.wav')
}

function recognizeBuffer(audio) {
    var buffer  = new PS.AudioBuffer()
    // ,   segment = new PS.Segmentation()
    ,   output
    ,   hyp
    ,   count = 0
    ; 

    output = recognizer.start();
    if (output != PS.ReturnType.SUCCESS) {
        console.log("Error starting recognizer");
    }

    audio.on('data', function (chunk) {
        while (buffer.size() < chunk.length) {
            buffer.push_back(0);
        }
        for (var i = 0; i < chunk.length; i += 1) {
            buffer.set(i, chunk.readInt16LE(i, true));
        }
        output = recognizer.process(buffer);
        if (output != PS.ReturnType.SUCCESS) {
            console.log("Error processing buffer");
        }

        hyp = recognizer.getHyp();
        console.log(hyp);
        console.log(count++);

    }).on('end', function () {

        output = recognizer.stop();
        if (output != PS.ReturnType.SUCCESS) {
            console.log("Error stopping recognizer");
        }

        hyp = recognizer.getHyp();
        console.log(hyp);

        console.log('done');
        
        buffer.delete();
        // segment.delete();
        recognizer.delete();
    });
}

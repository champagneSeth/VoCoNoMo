var PS          = require('./lib/jacksphinx.js')
,   record      = require('./lib/record')
,   fs          = require('fs')
,   wav         = require('wav')
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
    recognizer = init();
    wavToBuffer('wav/commands.wav', recognizeBuffer);
}

function run() {
    var count = 3;
    function countDown() {
        console.log(count);
        count -= 1;
        if (count > 0) {
            setTimeout(countDown, 1000);
        } else {
            console.log('Go!');
            record('wav/woo', 2000);
            setTimeout(function() {
                wavToBuffer('wav/woo.wav', recognizeBuffer);
            }, 2020);
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
    config.push_back(['-bestpath',  'no']);
    config.push_back(['-lm',        'jack.lm']);
    config.push_back(['-dict',      'jack.dic']);
    // config.push_back(['-remove_noise', 'yes']);

    recognizer = new PS.Recognizer(config);
    config.delete();

    return recognizer;
}

function end() {
    recognizer.delete();
}

function wavToBuffer(fileName, callBack) {
    console.log(fileName);
    var file    = fs.createReadStream(fileName)
    ,   reader  = new wav.Reader()
    ;

    reader.on('format', function (format) {
        // the WAVE header is stripped from the output of the reader 
        console.log(format);
    });

    callBack(reader);
    file.pipe(reader);
}

function recognizeBuffer(audio) {
    var buffer  = new PS.AudioBuffer()
    ,   segment = new PS.Segmentation()
    ,   count   = 0
    ,   output
    ,   hyp
    ; 

    output = recognizer.start();
    if (output != PS.ReturnType.SUCCESS) {
        console.log('Error starting recognizer');
    }

    audio.on('data', function(chunk) {
        console.log(chunk);

        while (buffer.size() < chunk.length) {
            buffer.push_back(0);
        }
        for (var i = 0; i < chunk.length; i += 1) {
            buffer.set(i, chunk.readInt16LE(i, true));
        }
        output = recognizer.process(buffer);
        if (output != PS.ReturnType.SUCCESS) {
            console.log('Error processing buffer');
        }

        hyp = recognizer.getHyp();
        console.log(hyp);
        console.log(count++);

        if (recognizer.getHypseg(segment) == PS.ReturnType.SUCCESS) {
            for (var i = 0 ; i < segment.size(); i++) {
                var segItem = segment.get(i);
                console.log('Word ' + segItem.word + ' starts at frame ' + segItem.start + ' ends at frame ' + segItem.end);
            }
        }

    }).on('end', function() {
        output = recognizer.stop();
        if (output != PS.ReturnType.SUCCESS) {
            console.log('Error stopping recognizer');
        }

        hyp = recognizer.getHyp();
        console.log(hyp);


        if (recognizer.getHypseg(segment) == PS.ReturnType.SUCCESS) {
            for (var i = 0 ; i < segment.size(); i++) {
                var segItem = segment.get(i);
                console.log('Word ' + segItem.word + ' starts at frame ' + segItem.start + ' ends at frame ' + segItem.end);
            }
        }

        console.log('done');
        
        buffer.delete();
        segment.delete();
        recognizer.delete();

        return hyp;
    });
}

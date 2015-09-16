var PS          = require('./pocketsphinx.js')
,   wordList    = require('./wordList.js')
,   record      = require('./record')
,   fs          = require('fs')
,   cmud        = require('cmusphinxdict')
,   recognizer  = initRecognizer()
;

sonus();

function sonus() {
    var pronunciation;

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
                // recognizeWav('wav/woo');
            }, 5000)
        }
    }

    cmud.get('we', addWordToList);
    cmud.get('made', addWordToList);
    cmud.get('it', addWordToList);

    loadWords();
    pronunciation = recognizer.lookupWord("HELLO");
    console.log(pronunciation);

    console.log('we made it');
    console.log('\n\nRecording in...');
    countDown();
}

// Initializes and returns the recognizer object
function initRecognizer(config) {
    if (!config) {
        config = new PS.Config();
        config.push_back(["-fwdflat", "no"]);
    }

    var recognizer = new PS.Recognizer(config);
    config.delete();

    return recognizer;
}

function addWordToList(word, pronouncings) {
    pronouncings.forEach(function (item, i) {
        var wordHolder = word;
        if (i > 0) {
            wordHolder += '(' + (i+1) + ')';
        }
        wordList.push([wordHolder, item]);
    });
}

// Adds words to recognizer
function loadWords() {
    var words = new PS.VectorWords();

    // Load wordList into VectorWords object
    wordList.forEach(function (wordPair) {
        words.push_back(wordPair);
    });

    if (recognizer.addWords(words) != PS.ReturnType.SUCCESS) {
        // Probably bad format used for pronunciation
        console.log("Error while adding words");
    }
 
    words.delete()
}

function recognizeWav(fileName) {
    var buffer  = new PS.AudioBuffer()
    ,   audio   = fs.createReadStream(fileName + '.wav')
    ,   output
    ,   hyp
    ;

    audio.on('data', function (chunk) {
        buffer.push_back(chunk);
        // for (var i = 0 ; i < array.length ; i++)
        //     buffer.push_back(array[i]); // Feed the array with audio data
    }).on('end', function () {
        output = recognizer.start();
        output = recognizer.process(buffer);
        output = recognizer.stop();
        hyp = recognizer.getHyp();
        console.log(hyp);
        console.log('done');
        buffer.delete();
        recognizer.delete();
    });
}


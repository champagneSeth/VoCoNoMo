var PS          = require('./pocketsphinx.js')
,   wordList    = require('./wordList.js')
,   cmud        = require('cmusphinxdict')
,   recognizer
;

module.exports  = init;

// Initializes and returns the recognizer object
function init(phrase, config) {
    if (!config) {
        config = new PS.Config();
        config.push_back(['-fwdflat', 'no']);
    }

    recognizer = new PS.Recognizer(config);
    config.delete();

    loadPhrase(phrase);

    return recognizer;
}


function loadPhrase(phrase) {
    var tokens = phrase.toUpperCase().split(' ');
    
    tokens.forEach(function (word){
        cmud.get(word, addWordToList);
    }); 

    loadWords();
    addGrammar(tokens);
}


function addWordToList(word, pronouncings) {
    pronouncings.forEach(function (item, i) {
        var wordHolder = word;
        if (i > 0) {
            wordHolder += '(' + (i+1) + ')';
        }
        if (wordList.indexOf([wordHolder, item]) > -1) return;
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
        console.log('Error while adding words');
    }
 
    words.delete()
}

function addGrammar(tokens) {
    var ids         = new PS.Integers()
    ,   transitions = new PS.VectorTransitions()
    ,   grammar     = {
            start       : 1
        ,   end         : tokens.length
        ,   numStates   : tokens.length+1
        }
    ;

    transitions.push_back({from: 1, to: 2, logp: 0, word: ''});
    tokens.forEach(function (word, i) {
        transitions.push_back({from: i, to: i+1, logp: 0, word: word});
    });

    grammar.transitions = transitions;
    if (recognizer.addGrammar(ids, grammar) != Module.ReturnType.SUCCESS) {
        console.log('Error while adding grammar');
    }
    
    ids.delete();
}

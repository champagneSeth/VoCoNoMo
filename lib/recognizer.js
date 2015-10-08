var PS          = require('lib/pocketsphinx.js')
,   wordList    = require('lib/wordList.js')
,   cmud        = require('cmusphinxdict')
,   recognizer 
;

module.exports      = recognizer;
module.exports.init = init;

// Initializes and returns the recognizer object
function init(config) {
    if (!config) {
        config = new PS.Config();
        config.push_back(["-fwdflat", "no"]);
    }

    recognizer = new PS.Recognizer(config);
    config.delete();

    cmud.get('we',   addWordToList);
    cmud.get('made', addWordToList);
    cmud.get('it',   addWordToList);

    loadWords();
    addGrammar();
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

function addGrammar() {
    var ids         = new PS.Integers()
    ,   transitions = new PS.VectorTransitions()
    ,   grammar     = {
            start       : 0
        ,   end         : 0
        ,   numStates   : 1
        }
    ;

    transitions.push_back({from: 0, to: 0, logp: 0, word: ""});
    transitions.push_back({from: 0, to: 0, logp: 0, word: "WE"});
    transitions.push_back({from: 0, to: 0, logp: 0, word: "MADE"});
    transitions.push_back({from: 0, to: 0, logp: 0, word: "IT"});

    grammar.transitions = transitions;
    recognizer.addGrammar(ids, grammar);
    ids.delete();
}

var PS          = require('./jacksphinx.js')
,   wordList    = require('./wordList.js')
,   cmud        = require('cmusphinxdict')
,   recognizer
;

module.exports  = init;

// Initializes and returns the recognizer object
function init(config) {
    if (!config) {
        config = new PS.Config();
        config.push_back(['-fwdflat',   'no']);
        //config.push_back(['-lm',        '8347.lm']);
        //config.push_back(['-dict',      '8347.dic']);
        //config.push_back(['-kws_threshold', '1']);
    }

    recognizer = new PS.Recognizer(config);
    config.delete();

    loadWords();
    addGrammar();

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

function addGrammar() {
    var ids         = new PS.Integers()
    ,   transitions = new PS.VectorTransitions()
    ,   grammar     = {
            start       : 0
        ,   end         : 3
        ,   numStates   : 4
        }
    ;

    // transitions.push_back({from: 0, to: 0, logp: 0, word: ''});
    // transitions.push_back({from: 0, to: 1, logp: 0, word: 'MORE'});
    // transitions.push_back({from: 1, to: 2, logp: 0, word: 'WHISKEY'});

    // transitions.push_back({from: 0, to: 1, logp: 0, word: 'HELLO'});
    // transitions.push_back({from: 1, to: 2, logp: 0, word: 'WORLD'});

    // transitions.push_back({from: 0, to: 1, logp: 0, word: 'ONE'});
    // transitions.push_back({from: 1, to: 2, logp: 0, word: 'TWO'});
    // transitions.push_back({from: 2, to: 3, logp: 0, word: 'THREE'});

    // transitions.push_back({from: 0, to: 1, logp: 0, word: 'BLACKJACK'});

    transitions.push_back({from: 0, to: 1, logp: 0, word: 'BLACKJACK'});
    transitions.push_back({from: 1, to: 2, logp: 0, word: 'BLACKJACK'});
    transitions.push_back({from: 2, to: 3, logp: 0, word: 'BLACKJACK'});

    // wordList.forEach(function (word, i) {
    //     if (word[0] !== 'WHISKEY')
    //         transitions.push_back({from: 1, to: 1, logp: 0, word: word[0]});
    // });

    grammar.transitions = transitions;
    if (recognizer.addGrammar(ids, grammar) != PS.ReturnType.SUCCESS) {
        console.log('Error while adding grammar');
    }

    // if (recognizer.addKeyword(ids, 'WHISKEY BLACKJACK') != PS.ReturnType.SUCCESS) {
    //     console.log('Error while adding key phrase');
    // }
    
    ids.delete();
    transitions.delete();
}

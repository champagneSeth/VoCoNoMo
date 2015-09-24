//Justin LeJeune - Sonus.js
//
//very basic command input for testing and demo
//

var sys = require("sys");
var stdin = process.openStdin();
var wordList = require('./wordList.js');
var s = require('./sonus.js');
var fs = require('fs');
var cmud = require('cmusphinxdict');
var word;
var adder;

start();

function start(){
console.log("\n\nBasic User Interface for testin and demo purposes only");
console.log("\n\nPlease enter the the number for the operation you would like to run:"+"\n 1.Run Sonus"+"\n 2.Add a new word to the CMU dictionary"+"\n 3.Add a new command"+"\n 4.Exit\n");
stdin.addListener("data", function(d) {
	if(d.toString().trim() == 4){process.exit();}
	else if(d.toString().trim() == 1){
		s.sonus();
	}
	else if(d.toString().trim() == 2){
		console.log("\n\nEnter the word you want to add, followed by the pronunciation(separated by a pipe).");
		stdin.addListener("data", function(d){
			if(d.toString().trim()){
				word = d.toString().trim();
				word = word.split("|");
				if(!word[1]){
					word[1] = cmud.get(word[0]);
					console.log(word[1]);
				}
				else {console.log(word[1]);}
				s.addWordToList(word[0],word[1]);
				setTimeout(console.log("Your word has been added"), 1000);
				start();
			}
		});
	
	}
	else if(d.toString().trim() == 3){console.log("\nFeature coming soon\n");
			setTimeout(console.log("Please wait"), 1000);
			start();}
  });
}

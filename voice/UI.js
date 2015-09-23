//Justin LeJeune - Sonus.js
//
//very basic command input for testing and demo
//

var sys = require("sys");
var stdin = process.openStdin();
var fs = require('fs');
var word;
var adder;

console.log("\n\nPlease enter the the number for the operation you would like to run:"+"\n 1.Run Sonus"+"\n 2.Add a new word to the CMU dictionary"+"\n 3.Add a new command"+"\n 4.Exit");
stdin.addListener("data", function(d) {
	if(d.toString().trim() == 4){die("this")}
	else if(d.toString().trim() == 1){
		var sonus = require("./sonus.js");
	}
	else if(d.toString().trim() == 2){
		console.log("\n\nEnter the word you want to add, followed by the pronunciation(separated by a pipe): ");
		stdin.addListener("data", function(d){
			if(d.toString().trim()){
				word = d.toString().trim();
				word = word.split("|");
				adder = "module.exports += [['" + word[0] + "', '" + word[1] + "']];";
				console.log(adder);
				var path = "wordList.js";
				fs.appendFile("wordList.js", adder, function(err){
				});
				
			}
		});
	
	}
	else if(d.toString().trim() == 3){sonus.sonus();}
  });
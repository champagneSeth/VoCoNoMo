var spawn = require('child_process').spawn;
var fs = require('fs');

var child = spawn(__dirname+ '\\childProcess.exe', ["We made it"]);

child.stdout.on('data', function (data){ 
	fs.writeFile('tmp.txt',data.toString(), function(err){
		if(err){
			return console.log(err);
		}
	});	
	process.stdout.write(data.toString()); 
});

child.on('close', function (code) { 
    console.log("\nFinished with process " + code);
});
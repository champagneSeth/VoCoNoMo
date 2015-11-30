var fs          = require('fs')
,   spawn       = require('child_process').spawn
,   PassThrough = require('stream').PassThrough
,   audio       = new PassThrough
,   ps
,   file
;

function start() { 
    // sox -t waveaudio 0 -c 1 -r 16k -b 16 -L -p
    ps = spawn('sox', 
        [
            '-t', 'waveaudio', '0'
        ,   '-c', '1'
        ,   '-r', '16k'
        ,   '-b', '16'
        ,   '-L'
        ,   '-p'
        ]
    );
    ps.stdout.pipe(file);
    //ps.stderr.pipe(info);
};

function stop() {
    if(ps) {
        ps.kill();
        ps = null;
    }
};

module.exports = function(fileName, delay) {
    file = fs.createWriteStream(fileName + '.wav', { encoding: 'binary' });
    start();

    setTimeout(function() {
        stop();
        file.end();
    }, delay);
}

module.exports = function(Module) {

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
var fileData0 = [];
fileData0.push.apply(fileData0, [65, 78, 68, 9, 65, 72, 32, 78, 32, 68, 10, 65, 78, 68, 40, 50, 41, 9, 65, 69, 32, 78, 32, 68, 10, 66, 76, 65, 67, 75, 74, 65, 67, 75, 9, 66, 32, 76, 32, 65, 69, 32, 75, 32, 74, 72, 32, 65, 69, 32, 75, 10, 68, 79, 87, 78, 9, 68, 32, 65, 87, 32, 78, 10, 69, 77, 9, 69, 72, 32, 77, 10, 69, 82, 9, 69, 82, 10, 72, 73, 84, 9, 72, 72, 32, 73, 72, 32, 84, 10, 72, 79, 76, 68, 9, 72, 72, 32, 79, 87, 32, 76, 32, 68, 10, 73, 84, 9, 73, 72, 32, 84, 10, 76, 69, 71, 9, 76, 32, 69, 72, 32, 71, 10, 77, 65, 68, 69, 9, 77, 32, 69, 89, 32, 68, 10, 77, 69, 9, 77, 32, 73, 89, 10, 82, 69, 83, 84, 65, 82, 84, 9, 82, 32, 73, 89, 32, 83, 32, 84, 32, 65, 65, 32, 82, 32, 84, 10, 83, 84, 65, 78, 68, 9, 83, 32, 84, 32, 65, 69, 32, 78, 32, 68, 10, 85, 80, 9, 65, 72, 32, 80, 10, 87, 69, 9, 87, 32, 73, 89, 10, 89, 65, 75, 9, 89, 32, 65, 69, 32, 75, 10]);
Module['FS_createDataFile']('/', 'jack.dic', fileData0, true, true);

  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage();

})();
return Module;}

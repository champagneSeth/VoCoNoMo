
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
fileData0.push.apply(fileData0, [72, 73, 84, 9, 72, 72, 32, 73, 72, 32, 84, 10, 82, 69, 83, 84, 65, 82, 84, 9, 82, 32, 73, 89, 32, 83, 32, 84, 32, 65, 65, 32, 82, 32, 84, 10, 83, 84, 65, 78, 68, 9, 83, 32, 84, 32, 65, 69, 32, 78, 32, 68, 10]);
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
return Module}
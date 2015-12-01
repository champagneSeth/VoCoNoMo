
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
fileData0.push.apply(fileData0, [76, 97, 110, 103, 117, 97, 103, 101, 32, 109, 111, 100, 101, 108, 32, 99, 114, 101, 97, 116, 101, 100, 32, 98, 121, 32, 81, 117, 105, 99, 107, 76, 77, 32, 111, 110, 32, 83, 117, 110, 32, 78, 111, 118, 32, 50, 57, 32, 48, 48, 58, 52, 48, 58, 53, 48, 32, 69, 83, 84, 32, 50, 48, 49, 53, 10, 67, 111, 112, 121, 114, 105, 103, 104, 116, 32, 40, 99, 41, 32, 49, 57, 57, 54, 45, 50, 48, 49, 48, 32, 67, 97, 114, 110, 101, 103, 105, 101, 32, 77, 101, 108, 108, 111, 110, 32, 85, 110, 105, 118, 101, 114, 115, 105, 116, 121, 32, 97, 110, 100, 32, 65, 108, 101, 120, 97, 110, 100, 101, 114, 32, 73, 46, 32, 82, 117, 100, 110, 105, 99, 107, 121, 10, 10, 84, 104, 101, 32, 109, 111, 100, 101, 108, 32, 105, 115, 32, 105, 110, 32, 115, 116, 97, 110, 100, 97, 114, 100, 32, 65, 82, 80, 65, 32, 102, 111, 114, 109, 97, 116, 44, 32, 100, 101, 115, 105, 103, 110, 101, 100, 32, 98, 121, 32, 68, 111, 117, 103, 32, 80, 97, 117, 108, 32, 119, 104, 105, 108, 101, 32, 104, 101, 32, 119, 97, 115, 32, 97, 116, 32, 77, 73, 84, 82, 69, 46, 10, 10, 84, 104, 101, 32, 99, 111, 100, 101, 32, 116, 104, 97, 116, 32, 119, 97, 115, 32, 117, 115, 101, 100, 32, 116, 111, 32, 112, 114, 111, 100, 117, 99, 101, 32, 116, 104, 105, 115, 32, 108, 97, 110, 103, 117, 97, 103, 101, 32, 109, 111, 100, 101, 108, 32, 105, 115, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 32, 105, 110, 32, 79, 112, 101, 110, 32, 83, 111, 117, 114, 99, 101, 46, 10, 80, 108, 101, 97, 115, 101, 32, 118, 105, 115, 105, 116, 32, 104, 116, 116, 112, 58, 47, 47, 119, 119, 119, 46, 115, 112, 101, 101, 99, 104, 46, 99, 115, 46, 99, 109, 117, 46, 101, 100, 117, 47, 116, 111, 111, 108, 115, 47, 32, 102, 111, 114, 32, 109, 111, 114, 101, 32, 105, 110, 102, 111, 114, 109, 97, 116, 105, 111, 110, 10, 10, 84, 104, 101, 32, 40, 102, 105, 120, 101, 100, 41, 32, 100, 105, 115, 99, 111, 117, 110, 116, 32, 109, 97, 115, 115, 32, 105, 115, 32, 48, 46, 53, 46, 32, 84, 104, 101, 32, 98, 97, 99, 107, 111, 102, 102, 115, 32, 97, 114, 101, 32, 99, 111, 109, 112, 117, 116, 101, 100, 32, 117, 115, 105, 110, 103, 32, 116, 104, 101, 32, 114, 97, 116, 105, 111, 32, 109, 101, 116, 104, 111, 100, 46, 10, 84, 104, 105, 115, 32, 109, 111, 100, 101, 108, 32, 98, 97, 115, 101, 100, 32, 111, 110, 32, 97, 32, 99, 111, 114, 112, 117, 115, 32, 111, 102, 32, 49, 32, 115, 101, 110, 116, 101, 110, 99, 101, 115, 32, 97, 110, 100, 32, 52, 32, 119, 111, 114, 100, 115, 10, 10, 92, 100, 97, 116, 97, 92, 10, 110, 103, 114, 97, 109, 32, 49, 61, 52, 10, 110, 103, 114, 97, 109, 32, 50, 61, 51, 10, 110, 103, 114, 97, 109, 32, 51, 61, 50, 10, 10, 92, 49, 45, 103, 114, 97, 109, 115, 58, 10, 45, 48, 46, 57, 48, 51, 49, 32, 60, 47, 115, 62, 32, 45, 48, 46, 51, 48, 49, 48, 10, 45, 48, 46, 57, 48, 51, 49, 32, 60, 115, 62, 32, 45, 48, 46, 50, 52, 51, 48, 10, 45, 48, 46, 57, 48, 51, 49, 32, 72, 73, 84, 32, 45, 48, 46, 50, 52, 51, 48, 10, 45, 48, 46, 57, 48, 51, 49, 32, 77, 69, 32, 45, 48, 46, 50, 52, 51, 48, 10, 10, 92, 50, 45, 103, 114, 97, 109, 115, 58, 10, 45, 48, 46, 51, 48, 49, 48, 32, 60, 115, 62, 32, 72, 73, 84, 32, 48, 46, 48, 48, 48, 48, 10, 45, 48, 46, 51, 48, 49, 48, 32, 72, 73, 84, 32, 77, 69, 32, 48, 46, 48, 48, 48, 48, 10, 45, 48, 46, 51, 48, 49, 48, 32, 77, 69, 32, 60, 47, 115, 62, 32, 45, 48, 46, 51, 48, 49, 48, 10, 10, 92, 51, 45, 103, 114, 97, 109, 115, 58, 10, 45, 48, 46, 51, 48, 49, 48, 32, 60, 115, 62, 32, 72, 73, 84, 32, 77, 69, 10, 45, 48, 46, 51, 48, 49, 48, 32, 72, 73, 84, 32, 77, 69, 32, 60, 47, 115, 62, 10, 10, 92, 101, 110, 100, 92, 10]);
Module['FS_createDataFile']('/', 'jack.lm', fileData0, true, true);

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
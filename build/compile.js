
var fs  = require('fs'),
    cs  = require('coffee-script').CoffeeScript,
    ls  = require('LiveScript'),
    min = require('uglify-js');


// Check extension matches given string
function extensionIs (filename, ext) {
  fileExt = filename.match(/\.(\w+)$/);
  return fileExt[1] === ext;
}

// Extract file ext
function getExt (filename) {
  fileExt = filename.match(/\.(\w+)$/);
  return (!fileExt) ? '' : fileExt[1];
}


// Create error readout string
function errorMessage (error, file) {

    error = String(error);

    var cr     = "\\n",
        lmatch = error.match(/line (\d+)/),
        line   = lmatch ? ' | line ' + lmatch[1] : "",
        ematch = error.match(/: ([^:]+)$/),
        err    = ematch ? ematch[1] : error;

    errorString  = 'Precompiler Error:' + cr;
    errorString += '  ' + file + line + cr;
    errorString += '  ' + err;

    return 'console.error("' + errorString + '");';

}


// Join files, compiling and minifying where required
function catFiles (filelist, minify) {

    var text = ""

    for (var i in filelist) {

        var filename = filelist[i];

        try {

            var filetext = fs.readFileSync(filename, 'utf-8');

            text += "/*\n * " + filename + " - File number: " + i + "\n *\n */\n\n\n";

            switch (getExt(filename)) {
              case "coffee":
              case "cs":
                filetext = cs.compile(filetext);
                break;

              case "ls":
                filetext = ls.compile(filetext);
                break;

              default:
                // JS: no work needed
            }

            text += filetext
            text += "\n\n\n"

        } catch (ex) {

            switch (ex.code) {
                case "ENOENT":
                    console.error("Can't find source file: " + filename);
                    break;
                default:
                    var formatErrMsg = errorMessage(ex, filename);
                    eval(formatErrMsg);
                    text += errorMessage (ex, filename);
            }

        }

    }

    return minify ? min(text) : text;

}

// Make buildspec from project file
function getBuildOptions (specfile) {

    try {
        return cs.eval(fs.readFileSync(specfile, 'utf-8'), { bare : true });
    } catch (ex) {
        console.log("Couldn't read project file:")
        console.log(ex);
        process.exit(1);
    }
}

// Build project, copy resulting srouce to destination file
function buildProject (spec) {

    var proj = catFiles(spec.source, spec.minify);

    fs.writeFileSync(spec.target, proj);

}

// Watch directory for filechanges
function monitorFiles (dirlist) {

    var currentTimer = 0;

    function debounce () {
        clearTimeout(currentTimer);
        currentTimer = setTimeout(function () {
            console.log("Rebuilding... " + __dirname);
            rebuild();
        }, 200);
    }

    for (var i in dirlist) {

        var dir = dirlist[i];

        fs.watch(dir, function (event, filename) {
            if (filename) {
                if (/\.(coffee|cs|ls|js)$/.test(filename) && event === 'change') {
                    debounce();
                }
            } else {
                debounce();
            }
        });

        console.log('Monitoring ' + dir + "...");

    }
}




/*
 * INIT
 *
 */


// Get project makefile
var spec = getBuildOptions(process.argv[2]);

// If monitoring set, create file watchers
if (spec.monitor) { monitorFiles(spec.monitor); }

// Refresh function - re-read project specs so file list can change
// without restarting process. Can't change monitor settings though.
function rebuild () {
    freshSpec = getBuildOptions(process.argv[2]);
    buildProject(freshSpec);
}

// Initial build
rebuild();


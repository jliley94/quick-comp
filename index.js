#!/usr/bin/env node
var fs = require("fs");
const path = require("path");

const defaultExtensions = ".jsx,.scss,.spec.jsx";
const args = process.argv.slice(2);
const fileArrayRegex = /^(?:\.{1}[\w|\d]+)+(?:,\B(?:\.{1}[\w|\d]+)+)*$/;

const getFlagValue = (flag) =>
  args.indexOf(flag) !== -1 && args[args.indexOf(flag) + 1];

console.log(`args ${args} `);

const request = {
  name: getFlagValue("--name") || getFlagValue("-n"),
  inFolder: !(args.includes("--no-folder") || args.includes("-nf")),
  extensions:
    getFlagValue("--extensions") || getFlagValue("-ext") || defaultExtensions,
  path: getFlagValue("--path") || getFlagValue("-p") || "",
  help: args.includes("--help") || args.includes("-h"),
};

const create = ({ name, inFolder, extensions, path }) => {
  console.log(`creating requested ${name} component files`);
  console.log(`inFolder ${inFolder} `);

  //create folder
  var dir = `${path || `.`}/${name}`;
  if (!fs.existsSync(dir) && inFolder) {
    fs.mkdirSync(dir);
    console.log(`${dir} folder created!`);
  }

  // create files
  const files = extensions.split(",");
  files.forEach((file) => {
    console.log(`${path || `.`}${inFolder ? `/${name}` : ""}/${name}${file}`);
    fs.appendFile(
      `${path || `.`}${inFolder ? `/${name}` : ""}/${name}${file}`,
      "",
      function (err) {
        if (err) throw err;
        console.log(`${name}${file} file created!`);
      }
    );
  });
};

const validate = ({ name, extensions, path, help }) => {
  if (help) {
    console.log("Usage: quickComp --name <name>");
    console.log("");
    console.log(
      "Creates a component folder and files with default configuration"
    );
    console.log("");
    console.log("Options:");
    console.log("");
    console.log("  -h, --help                        Display this usage info");
    console.log(
      "  -nf, --no-folder                  Create the requested files without a folder to contain them"
    );
    console.log(
      '  -ext, --extensions <extensions>   A string of comma separated list of file extensions to be created (by default: ".jsx,.scss,.spec.jsx"'
    );
    console.log(
      "  -p, --path <location>             Relative path for the files to be created (current location by default)"
    );
    return false;
  } else if (!name) {
    console.warn(
      "No name for files provided, use the flag --name <name>, or for more help use cmd --help"
    );
    return false;
  } else if (extensions && !fileArrayRegex.test(extensions)) {
    console.warn(
      "value for --extensions invalid, for more help use cmd --help"
    );
    return false;
  } else if (path && !fs.existsSync(path)) {
    console.warn("value for --path invalid, for more help use cmd --help");
    return false;
  }
  return true;
};

if (validate(request)) {
  create(request);
}

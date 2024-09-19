#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 <command> [options]")
  .command(
    ["$0 [name]", "create"],
    "create component files (will prompt for options if run without any)"
  )
  .command(["addCustomTemplate [path]", "add"], "fetch the contents of the URL")
  .options({
    name: {
      alias: "n",
      describe: "Name of your component, used for folder and file names",
      type: "string",
    },
    ["no-folder"]: {
      alias: "f",
      describe:
        "Create the requested files at requested path without a folder to contain them",
      type: "boolean",
    },
    extensions: {
      alias: "x",
      describe:
        "A comma or space separated list of the file extensions to be created",
      type: "string",
    },
    path: {
      alias: "p",
      describe:
        "Relative path location for the files to be created (default: current location)",
      type: "string",
    },
    ["no-template"]: {
      alias: "t",
      describe:
        "Create the requested files without using templates to give files contents",
      type: "boolean",
    },
    ["custom-placeholder"]: {
      alias: "c",
      describe:
        "Replaces the value of any {{custom}} placeholder to specified value when generating file contents from template files, by default this is set to .scss or .css if those are included in the --extensions flag",
      type: "string",
    },
    verbose: {
      alias: "v",
      describe: "Log extra information",
      type: "boolean",
    },
  })
  .example(
    "$0 -n newComponent -p src/components",
    "Creates a folder with 3 files (using the default extensions) with the name newComponent in the given path location"
  )
  .example(
    "$0 addCustomTemplate template.js",
    "Replaces the default .js template with template.js, this will be used to generate any .js files contents"
  )
  .help()
  .parse();

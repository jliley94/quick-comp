#!/usr/bin/env node
import { runWizard, defaultExtensions } from "../src/runWizard.js";
import { flagValidation } from "../src/validation.js";
import { addTemplate } from "../src/addTemplate.js";
import { createComponent } from "../src/createComponent.js";
import { argv } from "../src/argv.js";
import { getMatchForItem, splitExtensionsString } from "../src/utils.js";

const { _: commands, $0, ...flags } = argv;
const extensions = splitExtensionsString(argv.x || defaultExtensions);
let request = {
  ...flags,
  extensions,
  inFolder: !argv.f,
  customPath: argv.path || "./",
  noTemplate: argv.t,
  customPlaceholder: argv.c,
};

const isAddingTemplate = getMatchForItem(commands, "add");

if (!Object.keys(flags).length && !isAddingTemplate) {
  request = await runWizard();
}
const flagError = flagValidation(isAddingTemplate, request);
if (!flagError) {
  if (isAddingTemplate) {
    await addTemplate(request);
  } else {
    createComponent(request);
  }
} else {
  console.error(flagError);
}

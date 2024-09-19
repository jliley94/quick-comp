import fs from "fs";
import path from "path";
import { splitExtensionsString } from "./utils.js";

const extensionRegex = /^(\.{1}\w+)+$/;
const validateExtensionString = (string) => !extensionRegex.test(string);

export const validateExtensionsListString = (string) => {
  if (typeof string !== "string") return `${string} is not a valid extension`;
  if (!string) return;
  const extensionsList = splitExtensionsString(string);
  const lengthError =
    !extensionsList.length && `${string} is not a valid extension`;
  const error = extensionsList.find(validateExtensionString);
  return lengthError || (error && `${error} is not a valid extension`);
};

export const validatePath = (pathString = "./") =>
  fs.existsSync(path.join(process.cwd(), pathString));

export const flagValidation = (
  addCustomTemplate,
  { name, extensions, customPath }
) => {
  if (addCustomTemplate) {
    if (!customPath || !fs.existsSync(customPath))
      return "No template found, use specify a path to your custom template";
    return false;
  }

  if (!name)
    return "No name for files provided, use the flag --name <name>, or for more help use cmd --help";
  const extensionError = extensions.find(validateExtensionString);
  if (extensionError)
    return `${extensionError} is not a valid extension, for more help use the flag --help`;
  if (!validatePath(customPath))
    return "value for --path invalid, for more help use cmd --help";
  return false;
};

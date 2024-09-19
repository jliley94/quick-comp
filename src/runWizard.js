import { confirm, input } from "@inquirer/prompts";
import { validateExtensionsListString, validatePath } from "./validation.js";
import { getMatchForItem, splitExtensionsString } from "./utils.js";

export const defaultExtensions = ".jsx,.scss,.spec.jsx";

export const runWizard = async () => {
  const name = await input({
    message: "Name of the new component (camelCase):",
    required: true,
  });
  const inFolder = await confirm({
    message: `Create folder for component files?`,
  });
  const extensionsString = await input({
    message: "List of file extensions to be created (comma separated):",
    default: defaultExtensions,
    validate: (response) => validateExtensionsListString(response) || true,
  });
  const extensionsList = splitExtensionsString(extensionsString);
  const customPath = await input({
    message: `Relative path for the ${
      inFolder ? "folder and " : ""
    }files to be created in:`,
    validate: (p) => validatePath(p) ?? "Invalid path",
  });
  const useTemplate = await confirm({
    message: `Use templates to create content for files?`,
  });
  const customPlaceholder =
    useTemplate &&
    (await input({
      message:
        "Update the value of {{custom}} placeholder in templates? by default this is set to a stylesheet if you included one in the list of extensions",
      default: getMatchForItem(extensionsList),
    }));

  return {
    name,
    inFolder,
    extensions: extensionsList,
    customPath,
    noTemplate: !useTemplate,
    customPlaceholder,
  };
};

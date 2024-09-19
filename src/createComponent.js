import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getMatchForItem, replacePlaceholders } from "./utils.js";
import fs from "fs";
import path from "path";
import { createFile } from "./createFile.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createComponent = ({
  name,
  inFolder,
  extensions,
  customPath,
  noTemplate,
  customPlaceholder,
  verbose,
}) => {
  console.log(
    `QuickComp is creating requested ${name} component files in ${path.join(
      process.cwd(),
      customPath,
      inFolder ? name : ""
    )}`
  );

  //create folder
  var dir = `${customPath || `.`}/${name}`;
  if (inFolder && !fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    if (verbose) console.log(`${name} folder created!`);
  }

  // create files
  const custom =
    customPlaceholder !== undefined
      ? customPlaceholder
      : getMatchForItem(extensions, "css");

  // loop over provided file extensions
  extensions.forEach(async (fileType) => {
    const file = `${name}${fileType}`;
    const newFilePath = `${customPath || `.`}${
      inFolder ? `/${name}` : ""
    }/${file}`;

    // check for custom template, read template file
    const templateDirs = ["/customTemplates", ""];
    const [customTemplateFilePath, defaultFilePath] = templateDirs.map(
      (templateDir) =>
        path.join(__dirname, `../templates${templateDir}/template${fileType}`)
    );
    try {
      const templatePath = fs.existsSync(customTemplateFilePath)
        ? customTemplateFilePath
        : defaultFilePath;
      const fileContents =
        !noTemplate &&
        fs.existsSync(templatePath) &&
        fs.readFileSync(templatePath, "utf8");
      const updatedFile = fileContents
        ? replacePlaceholders(fileContents, name, custom)
        : "";
      await createFile(newFilePath, updatedFile, file, verbose);
    } catch (error) {
      console.error(`Could not create ${file}`);
      verbose && console.error(error);
    }
  });
};

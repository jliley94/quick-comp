import fs from "fs";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createFile } from "./createFile.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getExtension = (customPath) =>
  path.normalize(customPath).split("\\").pop().split(".").slice(1).join(".");

export const addTemplate = async ({ customPath, verbose }) => {
  const extension = getExtension(customPath);
  const destinationFolder = path.join(
    __dirname,
    "../templates/customTemplates"
  );
  const filePath = path.join(destinationFolder, `/template.${extension}`);
  const description = `Custom template for .${extension}`;

  // create customTemplates dir
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }

  try {
    const fileContents =
      fs.existsSync(customPath) && fs.readFileSync(customPath, "utf8");
    if (fileContents) {
      await createFile(filePath, fileContents, description, verbose, true);
    } else {
      console.error(`${description} was empty`);
    }
  } catch (error) {
    console.error(`Could not create ${description.toLowerCase()}`);
    verbose && console.error(err);
  }
};

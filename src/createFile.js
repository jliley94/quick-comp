import { confirm } from "@inquirer/prompts";
import fs from "fs";

export const createFile = async (
  destinationPath,
  fileContents,
  description = "File",
  verbose,
  canReplace
) => {
  const descriptionLower = description.toLowerCase();
  // check if file already exist
  if (fs.existsSync(destinationPath)) {
    if (canReplace) {
      const answer = await confirm({
        message: `replace existing ${descriptionLower}?`,
        default: false,
      });
      if (!answer) return console.log(`Kept ${descriptionLower}`);
    } else {
      return console.warn(`${description} already exists file ignored`);
    }
  }
  try {
    fs.writeFile(destinationPath, fileContents, function (error) {
      if (error) throw error;
      console.log(`${description} created.`);
    });
  } catch (error) {
    console.error(`Could not create ${descriptionLower}`);
    verbose && console.error(error);
  }
};

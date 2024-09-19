const dashes = /\-|\_/;
const setCase = (string, capitalise = true) =>
  capitalise ? string.toUpperCase() : string.toLowerCase();

export const setStartingCase = (string, capitalise = true) => {
  if (typeof string !== "string") return;
  if (!string) return string;
  return `${setCase(string, capitalise).at(0)}${string.substring(1)}`;
};

export const toCamelCase = (string) => {
  if (typeof string !== "string") return;
  if (!string) return string;
  if (!string.match(dashes)) return setStartingCase(string, false);
  return string
    .split(dashes)
    .reduce(
      (acc, cur) =>
        `${acc}${acc ? setStartingCase(cur.toLowerCase()) : cur.toLowerCase()}`,
      ""
    );
};

export const toPascalCase = (string) => {
  if (typeof string !== "string") return;
  if (!string) return string;
  if (!string.match(dashes)) return setStartingCase(string);
  return string
    .split(dashes)
    .reduce((acc, cur) => `${acc}${setStartingCase(cur.toLowerCase())}`, "");
};

export const ToSeparatedCase = (
  string,
  separator = "-",
  capitalise = false
) => {
  if (typeof string !== "string") return;
  if (!string) return string;
  const casedString =
    string === string.toUpperCase() ? string.toLowerCase() : string;
  return casedString
    .split("")
    .reduce(
      (acc, letter) =>
        `${acc}${letter === letter.toUpperCase() && acc ? separator : ""}${
          !letter.match(dashes) ? setCase(letter, capitalise) : ""
        }`,
      ""
    );
};

const placeholderTypes = {
  camelCase: { placeholder: "{{camelCase}}", format: toCamelCase },
  pascalCase: { placeholder: "{{PascalCase}}", format: toPascalCase },
  dashCase: {
    placeholder: "{{dash-case}}",
    format: (string) => ToSeparatedCase(string),
  },
  snakeCase: {
    placeholder: "{{snake_case}}",
    format: (string) => ToSeparatedCase(string, "_"),
  },
  trainCase: {
    placeholder: "{{TRAIN-CASE}}",
    format: (string) => ToSeparatedCase(string, "-", true),
  },
  constantCase: {
    placeholder: "{{CONSTANT_CASE}}",
    format: (string) => ToSeparatedCase(string, "_", true),
  },
  custom: {
    placeholder: "{{custom}}",
    format: (name, custom) => custom,
  },
};

const handleCustomPlaceholder = (contents) =>
  // remove any lines from files that contain { {custom}} if value is unset
  contents
    .split("\n")
    .filter((line) => !line.includes(placeholderTypes.custom.placeholder))
    .join("\n");

export const replacePlaceholders = (fileContents, name, custom) => {
  const updatedFileContents = custom
    ? fileContents
    : handleCustomPlaceholder(fileContents);

  // replace all remaining placeholders within file
  const regex = new RegExp(/\{\{[\w\-]+\}\}/, "gi");
  return updatedFileContents.replace(regex, (match) => {
    const formatter = Object.values(placeholderTypes).find(
      ({ placeholder }) => placeholder === match
    )?.format;
    return formatter ? formatter(name, custom) : "";
  });
};

export const splitExtensionsString = (string) => {
  if (typeof string !== "string") return;
  return string.split(/[\,|\s]/g).filter(Boolean);
};

export const getMatchForItem = (array, value) =>
  (value && array.find((item) => item.includes(value))) || "";

import {
  validateExtensionsListString,
  flagValidation,
} from "../src/validation";
import mockFs from "fs";
import mockPath from "path";
describe("validateExtensionsListString", () => {
  const inValidExamples = [1, ".", "js", ",", " ", ".js.", ".js%"];
  const validExamples = [
    "",
    ".js",
    ".test.js",
    ".js .css",
    ".js,.css",
    ",.js,.css,",
    ",    .js,   .css,",
  ];

  it("should return error message for invalid string", () => {
    inValidExamples.map((e) =>
      expect(validateExtensionsListString(e)).toBe(
        `${e} is not a valid extension`
      )
    );
  });

  it("should return undefined for valid string", () => {
    validExamples.map((e) => expect(validateExtensionsListString(e)).toBe());
  });
});

describe("flagValidation", () => {
  const mockFlags = {
    name: "mockName",
    extensions: [".js", ".css"],
    customPath: "/mockPath",
  };
  it("should return true when all flags are valid", () => {
    mockFs.existsSync = jest.fn(() => true);
    expect(flagValidation(false, mockFlags)).toBe(false);
    expect(flagValidation(true, mockFlags)).toBe(false);
  });

  it("should return error when flags are Invalid", () => {
    mockFs.existsSync = jest.fn(() => false);
    mockPath.join = jest.fn();
    expect(flagValidation(false, { ...mockFlags, name: undefined })).toBe(
      "No name for files provided, use the flag --name <name>, or for more help use cmd --help"
    );
    expect(flagValidation(false, { ...mockFlags, extensions: ["%js"] })).toBe(
      "%js is not a valid extension, for more help use the flag --help"
    );
    expect(flagValidation(false, { ...mockFlags, customPath: undefined })).toBe(
      "value for --path invalid, for more help use cmd --help"
    );
    expect(flagValidation(true, { ...mockFlags, customPath: undefined })).toBe(
      "No template found, use specify a path to your custom template"
    );
  });
});

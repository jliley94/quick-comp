import mockFs from "fs";
import mockPath from "path";
import { addTemplate } from "../src/addTemplate";

const mockError = jest.spyOn(console, "error").mockImplementation();

const setup = (exists, fileContents) => {
  jest.clearAllMocks();
  mockFs.existsSync = jest.fn(() => exists);
  mockFs.mkdirSync = jest.fn();
  mockFs.readFileSync = jest.fn(() => fileContents);
  mockFs.writeFile = jest.fn((p, f, c) => c(null));
  mockPath.normalize = jest.fn((s) => s);
  mockPath.join = jest.fn();

  addTemplate({ customPath: "./mockDir/mockFile.js" });
};

describe("addTemplate", () => {
  it("should create folder if it doesnt exist", () => {
    setup(false);
    expect(mockFs.existsSync).toHaveBeenCalled();
    expect(mockFs.mkdirSync).toHaveBeenCalled();
  });

  it("should not create folder if already exist", () => {
    setup(true);
    expect(mockFs.existsSync).toHaveBeenCalled();
    expect(mockFs.mkdirSync).not.toHaveBeenCalled();
  });

  it("should display error if template has no contents", () => {
    setup(true);
    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      "./mockDir/mockFile.js",
      "utf8"
    );
    expect(mockError).toHaveBeenCalledWith(
      "Custom template for ./mockDir/mockFile.js was empty"
    );
  });

  it("should create file if template has contents", () => {
    setup(true, "Mock template");
    expect(mockFs.readFileSync).toHaveBeenCalledWith(
      "./mockDir/mockFile.js",
      "utf8"
    );
    expect(mockError).not.toHaveBeenCalled();
  });
});

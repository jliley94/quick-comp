import mockFs from "fs";
import mockPath from "path";
import { createComponent } from "../src/createComponent";

const setup = (exists, inFolder, extensions = [".js"]) => {
  jest.clearAllMocks();
  mockFs.existsSync = jest.fn(() => exists);
  mockFs.mkdirSync = jest.fn();
  mockFs.readFileSync = jest.fn();
  mockFs.writeFile = jest.fn((p, f, c) => c(null));
  mockPath.join = jest.fn();

  createComponent({
    name: "mockComponent",
    inFolder,
    currentPath: "./",
    extensions,
    verbose: true,
  });
};

describe("createComponent", () => {
  it("should create folder", () => {
    setup(false, true);
    expect(mockFs.existsSync).toHaveBeenCalled();
    expect(mockFs.mkdirSync).toHaveBeenCalledWith("./mockComponent");
  });

  it("should not create folder if already exists", () => {
    setup(true, true);
    expect(mockFs.existsSync).toHaveBeenCalled();
    expect(mockFs.mkdirSync).not.toHaveBeenCalled();
  });

  it("should not create folder if not requested", () => {
    setup();
    expect(mockFs.existsSync).toHaveBeenCalled();
    expect(mockFs.mkdirSync).not.toHaveBeenCalled();
  });

  it("should get template content if exists for extensions", () => {
    setup(true, true, [".css", ".js"]);
    expect(mockFs.readFileSync).toHaveBeenCalledTimes(2);
  });

  it("should create file if it doesnt already exist", () => {
    setup(false, true, [".css", ".js"]);
    expect(mockFs.writeFile).toHaveBeenCalledTimes(2);
  });
});

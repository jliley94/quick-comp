import mockFs from "fs";

const mockLog = jest.spyOn(console, "log").mockImplementation();
const mockWarn = jest.spyOn(console, "warn").mockImplementation();
const mockError = jest.spyOn(console, "error").mockImplementation();

jest.unstable_mockModule("@inquirer/prompts", () => ({
  confirm: jest.fn(),
}));

const { confirm } = await import("@inquirer/prompts");

const setup = async (
  canFindTemplate,
  canReplaceFile,
  doesReplaceFile,
  canWriteFile = "mock error",
  description
) => {
  confirm.mockResolvedValueOnce(Promise.resolve(doesReplaceFile));
  mockFs.existsSync = jest.fn(() => canFindTemplate);
  mockFs.writeFile = jest.fn((p, f, c) => c(canWriteFile));
  await createFileModule(
    "mockDestinationPath",
    "mockFileContents",
    description,
    true,
    canReplaceFile
  );
};

let createFileModule;
beforeAll(async () => {
  const { createFile } = await import("../src/createFile");
  createFileModule = createFile;
});

describe("createFile", () => {
  it("should display message when file is successfully created", async () => {
    await setup(true, true, true, null);
    expect(mockFs.existsSync).toHaveBeenCalledWith("mockDestinationPath");
    expect(confirm).toHaveBeenCalled();
    expect(confirm).toHaveBeenCalledWith({
      message: "replace existing file?",
      default: false,
    });
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      "mockDestinationPath",
      "mockFileContents",
      expect.any(Function)
    );
    expect(mockLog).toHaveBeenCalledWith("File created.");
  });

  it("should display log when user chooses not to replace file", async () => {
    await setup(true, true, false, null);

    expect(mockFs.existsSync).toHaveBeenCalledWith("mockDestinationPath");
    expect(mockFs.writeFile).toHaveBeenCalledTimes(0);
    expect(mockLog).toHaveBeenCalledWith("Kept file");
  });

  it("should display warning when cant replace and file already exists", async () => {
    await setup(true, false, false, null);

    expect(mockFs.existsSync).toHaveBeenCalledWith("mockDestinationPath");
    expect(mockFs.writeFile).toHaveBeenCalledTimes(0);
    expect(mockWarn).toHaveBeenCalledWith("File already exists file ignored");
  });

  it("should display error when writeFile fails", async () => {
    await setup(false, false, false);

    expect(mockFs.existsSync).toHaveBeenCalledWith("mockDestinationPath");
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      "mockDestinationPath",
      "mockFileContents",
      expect.any(Function)
    );
    expect(mockError).toHaveBeenCalledWith("Could not create file");
  });

  it("should display custom description in logs", async () => {
    await setup(true, true, false, null, "Custom template");

    expect(mockFs.existsSync).toHaveBeenCalledWith("mockDestinationPath");
    expect(mockFs.writeFile).toHaveBeenCalledTimes(0);
    expect(mockLog).toHaveBeenCalledWith("Kept custom template");
  });
});

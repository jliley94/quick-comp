import {
  getMatchForItem,
  replacePlaceholders,
  setStartingCase,
  splitExtensionsString,
  toCamelCase,
  toPascalCase,
  ToSeparatedCase,
} from "../src/utils";

describe("setStartingCase", () => {
  it("should return string with first letter capitalised", () => {
    expect(setStartingCase("abc")).toBe("Abc");
    expect(setStartingCase("ABC")).toBe("ABC");
    expect(setStartingCase("")).toBe("");
    expect(setStartingCase(1)).toBe(undefined);
    expect(setStartingCase(undefined)).toBe(undefined);
  });

  it("should return string with first letter lowercase", () => {
    expect(setStartingCase("abc", false)).toBe("abc");
    expect(setStartingCase("ABC", false)).toBe("aBC");
    expect(setStartingCase("", false)).toBe("");
    expect(setStartingCase(1, false)).toBe(undefined);
    expect(setStartingCase(undefined, false)).toBe(undefined);
  });
});

describe("toCamelCase", () => {
  it("should return string  in camelCase format", () => {
    expect(toCamelCase("flatcase")).toBe("flatcase");
    expect(toCamelCase("ALLCAPS")).toBe("aLLCAPS");
    expect(toCamelCase("camelCase")).toBe("camelCase");
    expect(toCamelCase("PascalCase")).toBe("pascalCase");
    expect(toCamelCase("dash-case")).toBe("dashCase");
    expect(toCamelCase("snake_case")).toBe("snakeCase");
    expect(toCamelCase("TRAIN-CASE")).toBe("trainCase");
    expect(toCamelCase("CONSTANT_CASE")).toBe("constantCase");
    expect(toCamelCase("")).toBe("");
    expect(toCamelCase(1)).toBe(undefined);
    expect(toCamelCase()).toBe(undefined);
  });
});

describe("toPascalCase", () => {
  it("should return string  in PascalCase format", () => {
    expect(toPascalCase("flatcase")).toBe("Flatcase");
    expect(toPascalCase("ALLCAPS")).toBe("ALLCAPS");
    expect(toPascalCase("camelCase")).toBe("CamelCase");
    expect(toPascalCase("PascalCase")).toBe("PascalCase");
    expect(toPascalCase("dash-case")).toBe("DashCase");
    expect(toPascalCase("snake_case")).toBe("SnakeCase");
    expect(toPascalCase("TRAIN-CASE")).toBe("TrainCase");
    expect(toPascalCase("CONSTANT_CASE")).toBe("ConstantCase");
    expect(toPascalCase(1)).toBe(undefined);
    expect(toPascalCase()).toBe(undefined);
  });
});

describe("ToSeparatedCase", () => {
  it("should return string in dash-case format", () => {
    expect(ToSeparatedCase("flatcase")).toBe("flatcase");
    expect(ToSeparatedCase("ALLCAPS")).toBe("allcaps");
    expect(ToSeparatedCase("camelCase")).toBe("camel-case");
    expect(ToSeparatedCase("PascalCase")).toBe("pascal-case");
    expect(ToSeparatedCase("dash-case")).toBe("dash-case");
    expect(ToSeparatedCase("snake_case")).toBe("snake-case");
    expect(ToSeparatedCase("TRAIN-CASE")).toBe("train-case");
    expect(ToSeparatedCase("CONSTANT_CASE")).toBe("constant-case");
    expect(ToSeparatedCase(1)).toBe(undefined);
    expect(ToSeparatedCase()).toBe(undefined);
  });

  it("should return string in snake-case format", () => {
    expect(ToSeparatedCase("flatcase", "_")).toBe("flatcase");
    expect(ToSeparatedCase("ALLCAPS", "_")).toBe("allcaps");
    expect(ToSeparatedCase("camelCase", "_")).toBe("camel_case");
    expect(ToSeparatedCase("PascalCase", "_")).toBe("pascal_case");
    expect(ToSeparatedCase("dash-case", "_")).toBe("dash_case");
    expect(ToSeparatedCase("snake_case", "_")).toBe("snake_case");
    expect(ToSeparatedCase("TRAIN-CASE", "_")).toBe("train_case");
    expect(ToSeparatedCase("CONSTANT_CASE", "_")).toBe("constant_case");
    expect(ToSeparatedCase(1, "_")).toBe(undefined);
    expect(ToSeparatedCase(undefined, "_")).toBe(undefined);
  });

  it("should return string in CONSTANT_CASE format", () => {
    expect(ToSeparatedCase("flatcase", "_", true)).toBe("FLATCASE");
    expect(ToSeparatedCase("ALLCAPS", "_", true)).toBe("ALLCAPS");
    expect(ToSeparatedCase("camelCase", "_", true)).toBe("CAMEL_CASE");
    expect(ToSeparatedCase("PascalCase", "_", true)).toBe("PASCAL_CASE");
    expect(ToSeparatedCase("dash-case", "_", true)).toBe("DASH_CASE");
    expect(ToSeparatedCase("snake_case", "_", true)).toBe("SNAKE_CASE");
    expect(ToSeparatedCase("TRAIN-CASE", "_", true)).toBe("TRAIN_CASE");
    expect(ToSeparatedCase("CONSTANT_CASE", "_", true)).toBe("CONSTANT_CASE");
    expect(ToSeparatedCase(1, "_", true)).toBe(undefined);
    expect(ToSeparatedCase(undefined, "_", true)).toBe(undefined);
  });

  it("should return string in ALLCAPS format", () => {
    expect(ToSeparatedCase("flatcase", "", true)).toBe("FLATCASE");
    expect(ToSeparatedCase("ALLCAPS", "", true)).toBe("ALLCAPS");
    expect(ToSeparatedCase("camelCase", "", true)).toBe("CAMELCASE");
    expect(ToSeparatedCase("PascalCase", "", true)).toBe("PASCALCASE");
    expect(ToSeparatedCase("dash-case", "", true)).toBe("DASHCASE");
    expect(ToSeparatedCase("snake_case", "", true)).toBe("SNAKECASE");
    expect(ToSeparatedCase("TRAIN-CASE", "", true)).toBe("TRAINCASE");
    expect(ToSeparatedCase("CONSTANT_CASE", "", true)).toBe("CONSTANTCASE");
    expect(ToSeparatedCase(1, "", true)).toBe(undefined);
    expect(ToSeparatedCase(undefined, "", true)).toBe(undefined);
  });
});

describe("replacePlaceholders", () => {
  it("should return updated string with placeholders replaced with name in format of placeholder", () => {
    expect(
      replacePlaceholders("example {{TRAIN-CASE}} string", "componentName")
    ).toBe("example COMPONENT-NAME string");
    expect(
      replacePlaceholders("example {{PascalCase}} string", "componentName")
    ).toBe("example ComponentName string");
    expect(
      replacePlaceholders("example {{Unknown}} string", "componentName")
    ).toBe("example  string");
  });

  it("should return updated string with custom placeholder replaced with value", () => {
    expect(
      replacePlaceholders(
        "example {{camelCase}}{{custom}} string",
        "componentName",
        ".css"
      )
    ).toBe("example componentName.css string");
  });

  it("should remove any line from string if custom placeholder referenced without a value", () => {
    expect(
      replacePlaceholders(
        `first line {{snake_case}}
          second line {{custom}} will be removed
          third line will remain`,
        "componentName"
      )
    ).toBe(`first line component_name
          third line will remain`);
  });
});

describe("splitExtensionsString", () => {
  const exampleResult = ["apple", "banana", "pear"];
  it("should split string by comma or whitespace removing any empty values", () => {
    expect(splitExtensionsString("apple,banana,pear")).toEqual(exampleResult);
    expect(splitExtensionsString("apple banana pear")).toEqual(exampleResult);
    expect(
      splitExtensionsString(",, ,   , apple,   banana     pear    , ,,")
    ).toEqual(exampleResult);
    expect(splitExtensionsString("")).toEqual([]);
    expect(splitExtensionsString(",")).toEqual([]);
    expect(splitExtensionsString(" ")).toEqual([]);
  });
  it("should return undefined", () => {
    expect(splitExtensionsString(10)).toEqual();
    expect(splitExtensionsString()).toEqual();
  });
});

describe("getMatchForItem", () => {
  it("should return matching item from array when item contains value", () => {
    expect(getMatchForItem(["apple", "banana", "pear"], "apple")).toBe("apple");
    expect(getMatchForItem(["apple", "banana", "pear"], "app")).toBe("apple");
    expect(getMatchForItem(["apple", "banana", "pear"], "")).toBe("");
  });
});

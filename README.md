# Quick-Component

[![npm version](https://img.shields.io/npm/v/quick-component)](https://www.npmjs.com/package/quick-component)

Quick-Component is a command-line tool designed to speed up React development by automating the creation of component files, saving you from manually creating new React component folders / files every time.

## Installation

Ensure you have Node.js installed. Quick-Component works with Node.js versions `12.x` and above

Globally install the package to be able to create new component files from anywhere

```sh
npm install --global quick-component
```

Once installed you can start using the `quickComp` command in the console, here is the command to output the help information:

```sh
quickComp --help
```

## Commands

### The `create` command

`create` is the default command, meaning it doesn't need to be explicitly mentioned. You can either run `quickComp create` or simply `quickComp` with the appropriate options.

This command is used to create a components files and contents using the provided options. You can either run this command without any additional options / flags, You will be prompted for the options with a few questions or to skip this the options can be provided in the command itself.

#### Examples

`quickComp create`

    prompts user with a few questions and creates the requested files.

`quickComp newComponent -x .js`

    Creates a folder named newComponent with a file newComponent.js inside the current directory.

#### Option flags

| Flag name              | Alias | Description                                                                                                             | Notes                                                                       |
| ---------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `--name`               | `-n`  | Name for the files / folder that will be created                                                                        | Default option                                                              |
| `--no-folder`          | `-f`  | Create the requested files at requested path without a folder to contain them                                           | Default: `false`                                                            |
| `--extensions`         | `-x`  | A comma / space separated list of the file extensions to be created                                                     | Default: `.jsx, .scss, .spec.jsx`                                           |
| `--path`               | `-p`  | Relative path location for the files to be created                                                                      | Default: current path location                                              |
| `--no-template`        | `-t`  | Create the requested files without using templates to give files contents                                               | Default: `false`                                                            |
| `--custom-placeholder` | `-c`  | Replaces the value of any `{{custom}}` placeholder to specified value when generating file contents from template files | Default: `.scss` or `.css` if those are included in the `--extensions` flag |
| `--version`            |       | Displays current version of Quick-Component                                                                             |
| `--verbose`            | `-v`  | Log extra information                                                                                                   |
| `--help`               | `-h`  | Display this usage info                                                                                                 |

### The `addTemplate` command

> Command alias: `add`

Templates can be used to add contents to the files being created, by default templates are used for any files with the default extensions `.jsx, .scss, or .spec.jsx`. Templates can be omitted, creating only blank files by using the flag option `--no-template`.

If a custom template for a file extension exists, it will override the default template for that extension. You can have multiple templates for different file types.

You can add a new template by using the `addTemplate` or its alias `add` command. Specify the `path` to the new template and it will be added as an available template when running the create command.

#### Examples

`quickComp addTemplate ./dir/exampleTemplate.jsx`

    adds a template for `.jsx` files replacing the default template

`quickComp add ./exampleTemplate.js`

    using the `add` alias for the command, adds a template for `.js` files

## Templates

To create your own custom templates to be used to add contents to files created with Quick-Component:

1. Create a file with an extension that matches the files this template will be used for.
2. Give it the desired file contents, this will be added to any file of the same extension created by quickComp.
3. Add placeholders within the file contents, these will be replaced when creating the documents with the name of the file in the specified format.
4. Run: `quickComp add [path to template]` to add this as a custom template for that file extension.

Now you can run: `quickComp [name] -x [extension of your template]` and have a file created with the name provided, using your template to populate the files contents. Any placeholders within the file will have been replaced with the name in the placeholders format.

If the {{custom}} placeholder is found within a template and no value is given for `--custom-placeholder`, then that line in the template will be skipped and not added to the created file.

### Template placeholders

| Placeholder       | Description                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| {{camelCase}}     | Replaced by value of `--name` converted to camelCase                                                                                      |
| {{PascalCase}}    | Replaced by value of `--name` converted to PascalCase                                                                                     |
| {{dash-case}}     | Replaced by value of `--name` converted to dash-case                                                                                      |
| {{snake_case}}    | Replaced by value of `--name` converted to snake_case                                                                                     |
| {{TRAIN-CASE}}    | Replaced by value of `--name` converted to TRAIN-CASE                                                                                     |
| {{CONSTANT_CASE}} | Replaced by value of `--name` converted to CONSTANT_CASE                                                                                  |
| {{custom}}        | Replaced by value of `--custom-placeholder`. By default this is set to `.scss` or `.css` if those are included in the `--extensions` flag |

#### Example

A `.jsx` template with the file contents:

```
export const {{PascalCase}} = () => {
    return (
        <div className="{{dash-case}}">
            {{PascalCase}} component
        </div>
    );
}
```

When added as a custom template, this would be the result file contents for `myComponent.jsx` created by running: `quickComp myComponent -x .jsx`:

```
export const MyComponent = () => {
    return (
        <div className="my-component">
            MyComponent component
        </div>
    );
}
```

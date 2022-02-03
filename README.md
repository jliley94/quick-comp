## QuickComp
Helps quickly create new React component files from the console which can be configured to your preferences. 

Globally install the package to be able to create new component files from anywhere  
 `npm install -g quick-component`  
   
 Once installed you can start using the quickComp command in the console, here is the command to output the help information:  
 `quickComp --help`


### Command flags
|   Flag name   |    alias    |   description |
| --- | --- | --- | 
| --name \<name> | -n | name for the files / folder that will be created |
| --help | -h | Display this usage info |
| --no-folder | -nf | Create the requested files without a folder to contain them |
| --extensions \<extensions> | -ext | A string of comma separated list of file extensions to be created (by default: ".jsx,.scss,.spec.jsx") |
| --path \<path> | -p | Relative path for the files to be created (current location by default) |
| --verbose | -v | log extra information |


### Example 
`quickComp --name myComponent --extensions ".js,.css"`  
This will create a folder myComponent containing 2 files: myComponent.js and myComponent.css at the current path location.

# Gigadex (JNix)

## Command List

### Basic

+ pwd
  + **Name** - Present Working Directory
  + **Synopsis** - `pwd`
  + **Description** - Outputs the current directory
+ ls
  + **Name** - List Files
  + **Synopsis** - `ls` `ls [path]` `ls /` `ls /[path]`
  + **Description** - Lists the the files in `[path]`
+ cd
  + **Name** - Change Directory
  + **Synopsis** - `cd` `cd [path]` `cd /` `cd /[path]`
  + **Description** - Changes the current pwd to `[path]`
    + `cd` - Changes the pwd to the home directory
    + `cd [path]` - Changes the pwd to `[path]`
    + `cd /` - Changes the pwd to the root directory
    + `cd /[path]` - Changes the pwd to `[path]` relative to the root directory `/`
+ cat
  + **Name** - Output File
  + **Synopsis** - `cat [path]`
  + **Description** - Outputs the contents of file at `[path]`
+ mkdir
  + **Name** - Make Directory
  + **Synopsis** - `mkdir [path]`
  + **Description** - Creates a directory at `[path]`
+ node
  + **Name** - Node Script
  + **Synopsis** - `node [script]`
  + **Description** - Runs `[script]` as NodeJS
+ clear
  + **Name** - Clear Console
  + **Synopsis** - `clear`
  + **Description** - Clears the console
[TOC]

# OS

The OS is in charge of creating an environment for Applications to easily be developed. Think of this as an API for Applications to build on-top of, among the other things it does. The OS will receive commands and data, which it will then have to process. After it has been processed, the OS may need to then send data back to the Application the data originated from.



---

# Settings

The OS comes with settings which can be changed to suit the users needs. These are more so for the user, however, also affect the OS in some ways. Each setting can be changed independently for the user, however, the administrators can setup global defaults for all the users.



## Port

The port effects the web server which the OS runs on. This is mainly used when the user either wants to host it on a specific port, or the default port (3000) is being used.



## Browser

This setting should be changed by the user, if the default browser (chrome) is not what they would like the OS to open in.



## Desktop Environment

This will then the OS which desktop environment to open, this should be changed when the default desktop environment (Leaf) is not being used.



## Time Formatting

Depending on your country, the way the time is formatted may differ. This is the setting you'll want to change if the time formatting is wrong.



---

# User

The user is able to do many things on login. Most of these are for administration, allowing you to create new users, and give users administration privileges.



## Add User

This will simply add a new user who can login. Any global applications installed will be useable by the new user, however, they will need to redownload any local applications. The new user will need to have a:

- Username
- Password (can be blank)

This is to separate users from each other.



## Delete User

When you delete a user, any local applications they have installed will be deleted. However, any global applications that they may have installed, will still be accessible to the other users. To delete the user, you will need access to their:

- Username
- Password

This is to make sure that only administrators and that user can delete their account.



## Login User

Once a user has been made, you can then login as that user. This will setup their environment and get a few configuration questions completed, such as the time formatting. They will need to login with their:

- Username
- Password

This authenticates them as the correct user.



## Administrator Users

The first user to create an account automatically gets given administrator privileges. This user then decides who to give them too through the login screen. There is a button which allows any administrator to login and control other user accounts, including the creation, deletion, and setting accounts as administrator accounts. This login requires an administrators:

- Username
- Password

To validate that they are currently and administrator.



---

# Applications

Applications can be created by users of the OS to do anything the user desires. For these applications to be valid, they need to have a `metadata.json` file, which will contain data about the application (see below). This data is used for multiple purposes, which are listed with the data itself.



## Data

This will explore the metadata which applications will have to include to be valid. Without this metadata, the application is recognised as invalid by the server, and a message is sent to the creator exploring what needs to be included.



### Name

The name of the application is set by the author when they first create their application. This name is used when the application is viewed, and can be changed later on. If the name has been changed, the author is recommended to remove the old application, as to not clog up the services.



For a name to be valid, you must place it in the `metadata.json` as a string:

```json
	"name": "name of your application"
```

If the application's name is not in string format, or the string is empty, it will be denied and said error will be returned.



### Author

The author of the application is set by the creator, this can either be their name, a company name, or anything that can claim ownership of the application. The author of the application can be changed. If this is done, it is recommended that the author deletes the other application to remove any confusion from the users.



For the author to be valid, you must place it in the `metadata.json` as a string:

```json
	"author": "name of author"
```

If the application's name is not in string format, or the string is empty, it will be denied and said error will be returned.



### Icon

An icon for the application is not required, but is recommended so that the application is easily identifiable. If no icon for the application is provided, it will be given a default icon by the OS. The icon for the application can be located anywhere in the applications file structure, but is not found automatically by the OS. Icons can be in any web-safe format, including:

- `.svg`
- `.png`
- `.gif`
- `.jpg`
- `.jpeg`



For the icon to used by the OS, you must place in in the `metadata.json` as a string:

```json
	"icon": "path/to/icon"
```

If the application's icon is not in string format, or the string is empty, it will be denied and said error will be returned.



### Path

The path of the current applications "installed" on the users system, are given to the OS on a few events:

- The OS first boots
- The user views their applications
- The user adds a new application
- The user deletes an application

These events will cause the application paths to be updated on the OS, allowing for a much smoother flow for the user and OS.



The path for an application is chosen by the sever using the name of the application, along with the author's name. This means no metadata is required for the path, and applications can have the same name, unless created by the same author.



## Opening Applications

The client will have to send data to the server about the application which is being opened. The data which is sent/received (see below) is then used to identify which app is to be opened.



### Client to Server

#### Path

The application's path is linked to its icon/name. When either is clicked, the application is run form this location. This data is sent to the server, which will then return the application's data for the OS to read and use.



### Server to Client

#### ID

This ID is the application's unique ID. This ID is changed on every run of the application as it is not tied to the application. Instead this ID is tied to the application's process which is currently running. This ID can then be used to access information on the application's process.



## Closing Applications

The client will have to send data to the server about the application which is being closed. The data which is sent/received (see below) is then used to identify which app is to be closed.



### Client to Server

#### ID

The client will send the server the application's process's ID. this will be used by the server to close the correct application. If said application has crashed, then the server will notify the OS of this. This crash is detected every connection update, meaning IDs will not become mixed over time.



### Server to Client

#### Status

This status is a code which relates to the statuses used for the internet ([found here](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)). These codes will then be used by the OS to determine what to do next. If an error needs to be displayed, the OS will react accordingly, same with likewise situations.
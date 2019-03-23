# Startup

+ Master Boot file `boot.js`
  + Check for missing or corrupt files
  + Check core structure
+ Load main startup file `startup.js`
+ Load users' info `lgur.js`
  + Decrypt db file to local variable (.env?)
  + If no users, run new user file `lgnur.js`
+ Load login file `lg.js`
+ Run login prompt `login.js`
+ If login success, load success file `lgss.js` 
+ If login failure, load failure file (or keep local) `lgfl.js`
+ Load basic command components `cmdload.js`
+ Run command test `cmdchk.js`
+ Initialize system config `cfgld.js`
  + Load date & time to local and check time override
  + Load motd from config
  + Load general config for custom commands (not modules)
  + Set scheme for colors.js from config
+ Look for modules `modulechk.js`
+ Run module test `modulechk.js`
+ Print motd to console `motd.js`
+ Begin command loop

## Shutdown

+ NOTE: "Exit" command has to be executed in order to begin shutdown
+ Check for saved work or ongoing processes
+ Check active users

## Notes

+ Motd
  + Add custome syntax or code to allow easy changing to the message
# Analyticord-source/module-nodejs/beta
https://analyticord.solutions/api/version?lib=node

This module requires:
>Request

## Getting started
To use the Analyticord NodeJS module, download the analyticord.js file, place it in the same directory as your bot and add this line to the top:

```
var analyticord = require('./analyticord.js')
```
Now you've imported the module, you need to login to Analyticord and start logging information, to do this, use this function
```
analyticord.init(options, token, discordClient)
```
# Options
The init function comes with the ability to configure the module, here's the options:
```
noMessages (BOOL true/false)
```
Enabling this option will stop Analyticord from ever putting messages into your console (apart from errors)
```
suppressMessages (BOOL true/false)
```
Enabling this option will make Analyticord only log important messages into console.
```
sendVerifiedMessage (BOOL true/false)
```
Enabling this option will give you an extra message with the ID of the data entry, this is for pre-beta users only, but if you are on pre-beta, we highly recommend you turn this on!
```
updateCheck (BOOL true/false)
```
Enabling this option will make Analyticord check for updates at startup, if there's an update avaliable, we'll alert you via the console.

# Token
This is your bots token, you'll be sent this by Nevexo or Nightmare if on the pre-beta & you can view it from the frontend after it's released.

# DiscordClient
This is the client that your bot uses, it currently doesn't do anything with your client, but it's required for future updates.

# Example init call
```
analyticord.init({noMessages: false, suppressMessages: false, sendVerifiedMessage: true, updateCheck: true}, '[token]', client)
```

# Sending data to Analyticord

We have a predefined set of eventTypes, you can view them at https://anlyti.co/eventTypes
When you know which one you want to use, like 'message' you can call it like this:
```
analyticord.send('guildJoin', guildCount)
```
'guildJoin' is the eventType and 'verified' is the data sent with it (comma seperated, read more on our blog about eventTypes (https://anlyti.co/eventTypes)

# Logging how many messages you recieve.

To reduce strain on our servers, we only send the amount of messages your bot has dealt with every minute, to enable message tracking (NOT LOGGING), add this code to your onMessage event:
```
analyticord.message()
```
After the first call, the process will start and every minute the bot will send your cound of messages away to the server, the eventType for this is 'messages' if you wish to /api/getData them at a later date, please don't submit to messages yourself, it costs alot to run Analyticord and it currently doesn't make us any money back, thank you.

var request = require('request')
var exports = module.exports = {};
exports.done = false;
var status = false
var token = null
var client = null
var version = 1.0
var config = null
var server = "http://analyticord.solutions"


function eventInit() {
  client.on('message', message => {
    console.log("Message")
  });

}

exports.init = function(options, tokenB, clientB) {
  if (client != undefined) {
    client = clientB
    eventInit()
  }
  token = tokenB
  if (options == undefined) {
    //consoleLog('INFO', 'No options provided. Using default config.')
    config = JSON.stringify({noMessages: false, suppressMessages: true, sendVerifiedMessage: false, updateCheck: true})
  }else {
    config = JSON.parse(JSON.stringify(options))
    if (config.updateCheck == undefined) {config.updateCheck = true}
    if (config.noMessages == undefined) {config.noMessages = false}
    if (config.suppressMessages == undefined) {config.suppressMessages = true}
    if (config.sendVerifiedMessage == undefined) {config.sendVerifiedMessage = false}
  }
  if (config.noMessages == false && config.suppressMessages == false) {console.log("[AC] Connecting to Analyticord...")}
  request.get(server + '/api/botLogin', {
    'auth': {
      'bearer': token
    }
  }, function(error, response, body) {
      if (error) { 
        console.log("[AC] Login failed, the servers might be down.")

      }else {
        if (JSON.parse(body).error != undefined){
          console.log("[AC] Login failed. Error: " + JSON.parse(body).error + "\n[AC] Your bot will continue to start, but it will not log any information to the Analyticord Service.")
        } else {body = JSON.parse(body)
        if (config.noMessages == false){console.log("Logged in as " + body.name + " by " + body.owner)}
        status = true //Ready.
        exports.done = true
      }}
  });
  if (config.updateCheck) {
    request.get(server + '/api/version?lib=node', function(error, response, body){
      if (error) {if (config.noMessages == false){console.log('[AC] Update check failed.')}}
      if (response.statusCode == 200 && parseFloat(body) > parseFloat(version)) {
        console.log("[ANALYTICORD] Update " + parseFloat(body) + " is avaliable! (You're using " + version + "). To use the latest Analyticord features, please update https://github.com/analyticord/module-nodejs")
      }
    })
  }

}



exports.send = function(eventType, data) {
  request.post(
    {url: server + '/api/submit',
    'auth': {
      'bearer': token
    },
    form: {
      'eventType': eventType,
      'data': data
    }
  }, function(error, response, body) {
      if (error) { 
        console.log("[AC] Sending data failed, the servers may be down.")

      }else {
        if (config.sendVerifiedMessage) {console.log("Data was sent successfully! You can verify the data was sent correctly by going to https://analyticord.solutions/api/verified?id=" + JSON.parse(body).ID)}
        
      }
  });
}

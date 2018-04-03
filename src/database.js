// load our data from agenda.json
var data = require('../settings/agenda.json')

// make all Entries lowercase (makes it easier to compare them)
data=JSON.parse(JSON.stringify(data).toLowerCase())

/**
 * Returns all sessions for a single speaker
 * @param {*} speaker 
 */
exports.getAllBySpeaker=function(speaker){     
    console.log("Returning all Sessions matching the speaker "+speaker.toLowerCase())   
    return data.filter(session => {
        if (session.speakers!=null && session.speakers.indexOf(speaker.toLowerCase())>-1){
            return true;
        }
        return false;
    });
}


// a counter variable to store how often a single user asked an intent
var howOftenAskedCounter={};


/**
 * Return the number of times a single user invoked the intent
 * @param {*} intent an intentName
 * @param {*} user The alexa user String i.e. "amzn1.ask.account.a-test-user-ID"
 * @returns the number of times the user invoked the intent
 */
exports.howOftenWasThisAsked=function(intent, user){         
    //concatenate intent and user and remove all "." and "-" from the key
    var key=(intent+user).replace(/\./g,'').replace(/\-/g,'')
    // if the user has never asked this, initialize the collection with 0
    if (howOftenAskedCounter[key]==null){
        howOftenAskedCounter[key]=0;
    }
    // increment the value by 1
    howOftenAskedCounter[key]++;

    console.log(`${intent} has been asked by the user ${howOftenAskedCounter[key]} times.`)
    return howOftenAskedCounter[key];
}



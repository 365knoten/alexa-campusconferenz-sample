/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


const Alexa = require('alexa-sdk');

// The settings we will used to register our skill with Alexa
const settings = require('../appid.json')


// A the messages we will return to the user
const MESSAGES = require('../messages/messages.json');

// Our "Database"
const database = require('./database');











console.log("Starting Campus Conference skill")





// These are the handlers for the intents this skill implements
const handlers = {

    //********************************************************************************** */
    //******* Implementing Amazon default Intents       ******************************** */
    //********************************************************************************** */

    // The default intent.
    // This is going to be called if no other intends match
    // or if the skill is invoked without any parameters
    'Unhandled': function (intent, session, response) {
        console.log('"Unhandled" Intent invoked');
        // this will "ask" the user the help message
        // if the user does not respont within a given time with a valid intent the skill will ask again
        this.emit(':ask', MESSAGES.HELP, MESSAGES.HELP);
    },
    // This is the intent that is called whenever the asks alexa to "open campusconference"
    // This has to be implemented by every skill
    "LaunchRequest": function (intent, session, response) {
        console.log('"LaunchRequest" Intent invoked');
        // this will just redirect to  the "Unhandled" intent as we don't want to handle this seperately
        this.emit('Unhandled');
    },  
    // This is the intent that is called whenever the users asks for help 
    // This has to be implemented by every skill
    "AMAZON.HelpIntent": function (intent, session, response) {
        console.log('"Help" Intent invoked');
        // this will just redirect to  the "Unhandled" intent as we don't want to handle this seperately
        this.emit('Unhandled');
    },


    

    // this is the intent that is called whenever the user asks Alexa to cancel
    // This has to be implemented by every skill
    "AMAZON.CancelIntent": function (intent, session, response) {
        console.log('"Cancel" Intent invoked');
        // this will just redirect to  the "StopIntent" intent as we don't want to handle this seperately
        this.emit('AMAZON.StopIntent');
    },



    // this is the intent that is called whenever the user asks Alexa to stop
    // This has to be implemented by every skill
    "AMAZON.StopIntent": function (intent, session, response) {
        console.log('"Stop" Intent invoked');
        var userID = this.event.session.user.userId;

        // Did a single user tell alexa to stop  three times? Then Respont angrily
        if (database.howOftenWasThisAsked("STOP",userID)>2){
            console.log("Alexa has been asked more than three times by the current user to stop");
            // We take a random Message from the MESSAGES.GOODBYE_ANGRILY Array
            var goodbymessageangrily = MESSAGES.GOODBYE_ANGRILY[Math.floor(Math.random() * MESSAGES.GOODBYE_ANGRILY.length)];
            this.emit(':tell', goodbymessageangrily);
            return;
        }

        // We take a random Message from the GOODBYEMESSAGES Array
        var goodbymessage = MESSAGES.GOODBYE[Math.floor(Math.random() * MESSAGES.GOODBYE.length)];
        this.emit(':tell', goodbymessage);
    },








    //********************************************************************************** */
    //******* Implement our Custom Intent               ******************************** */
    //********************************************************************************** */


    'WhenSpeaksIntend': function (intent, session, response) {
        console.log('"WhenSpeaksIntend" Intent invoked');
        // retrieve person slot value from request
        const Person = this.event.request.intent.slots.Person.value;

        // retrieve all sessions for the given person        
        var sessions = database.getSessionsBySpeaker(Person);

        console.log("Found " + sessions.length + " sessions for " + Person);

        // Check if there are sessions for the speaker
        if (sessions == null || sessions.length == 0) {
            // if not, emit an error message
            this.emit(':tell', `Ich kann ${Person} nicht als Sprecher finden.`);
        }
        else {

            // otherwise build the response

            var message = `${Person} spricht`;
            for (var i = 0; i < sessions.length; i++) {

                // build the conjunction to prepend before each session. 
                // Add nothing to the first session
                // and an "und" before the last session
                // add a comma before every other session
                var conjunction = "";
                if (i != 0) {
                    if (i != (sessions.length-1)) {
                        conjunction = ", ";
                    } else {
                        conjunction = " und "
                    }
                }
                // construct the session string
                message += `${conjunction} um ${sessions[i].time} mit dem Vortrag ${sessions[i].title}`;
            }

            console.log(message);
            this.emit(':tell', message + ".");
        }
    }

};











/**
 * This is the wireup function for the skill
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = settings.APPID;
    alexa.registerHandlers(handlers);
    alexa.execute();
    
};



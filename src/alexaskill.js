const Alexa = require('alexa-sdk');

const settings = require('../appid.json')
const messages = require('../settings/messages.json')
const database = require('./database')


console.log("Starting Campus Conference skill")

/**
 * Export the Alexa Handler
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


const handlers = {
    'SessionQueryIndent': function () {
        const Zeit = this.event.request.intent.slots.Zeit.value;
        //emit response directly
        this.emit(':tell', 'Es gibt dieses Sessions' + Zeit);
    },

    'WhenSpeaksIntend': function () {
        const Person = this.event.request.intent.slots.Person.value;
        //emit response directly
        var sessions = database.getAllBySpeaker(Person);
        console.log("Found " + sessions.length + " sessions for " + Person);


        if (sessions == null || sessions.length == 0) {
            this.emit(':tell', "Ich kann " + Person + " nicht als Sprecher finden.");
        } else {

            var message = Person + " spricht ";

            for (var i = 0; i < sessions.length; i++) {
                if (i != 0 && i != sessions.length) {
                    message += ","
                }
                if (i != 0 && i == sessions.length) {
                    message += " und "
                }
                message += " um " + sessions[i].time + " mit dem Vortrag " + sessions[i].title;
            }

            this.emit(':tell', message);
        }
    },


    // Below are Handlers for some Defaults Intends

    'Unhandled': function () {
        this.emit(':ask', messages.HELP, messages.HELP);
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = messages.GOODBYE[Math.floor(Math.random() * messages.GOODBYE.length)];
        this.emit(':tell', speechOutput);
    },
    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = messages.GOODBYE[Math.floor(Math.random() * messages.GOODBYE.length)];
        this.emit(':tell', speechOutput);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        this.emit('Unhandled');
    }


    /*
    Not Implemented
        AMAZON.HelpIntent
        AMAZON.MoreIntent
        AMAZON.NavigateSettingsIntent
        AMAZON.NextIntent
        AMAZON.PageDownIntent
        AMAZON.PageUpIntent
        AMAZON.PreviousIntent
        AMAZON.ScrollDownIntent
        AMAZON.ScrollLeftIntent
        AMAZON.ScrollRightIntent
        AMAZON.ScrollUpIntent
        */
};

